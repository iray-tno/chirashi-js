import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock node:fs before importing posts so the module-level cache doesn't hit real fs
vi.mock('node:fs');

import * as fs from 'node:fs';
import { parseTag } from './posts';

// ---------------------------------------------------------------------------
// parseTag — pure function, no fs needed
// ---------------------------------------------------------------------------
describe('parseTag', () => {
  it('returns the tag as both display and slug for plain tags', () => {
    expect(parseTag('Python')).toEqual({ display: 'Python', slug: 'Python' });
  });

  it('parses "display(slug)" format', () => {
    expect(parseTag('競プロ(CompProg)')).toEqual({
      display: '競プロ',
      slug: 'CompProg',
    });
  });

  it('handles tags with spaces before the parenthesis', () => {
    expect(parseTag('Machine Learning(ML)')).toEqual({
      display: 'Machine Learning',
      slug: 'ML',
    });
  });

  it('treats a tag with no parentheses as a plain tag', () => {
    expect(parseTag('Go')).toEqual({ display: 'Go', slug: 'Go' });
  });
});

// ---------------------------------------------------------------------------
// getAllPosts with mocked fs
// ---------------------------------------------------------------------------

const MOCK_POST_MD = `---
title: Test Post
author: Alice
category: Tech
tags: [Python, '競プロ(CompProg)']
publish: true
---

Body text.
`;

const UNPUBLISHED_POST_MD = `---
title: Draft Post
author: Bob
category: Draft
tags: []
publish: false
---

Draft body.
`;

function setupFsMock(files: Record<string, string>) {
  vi.mocked(fs.readdirSync).mockReturnValue(
    Object.keys(files) as unknown as ReturnType<typeof fs.readdirSync>
  );
  vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
    const name = String(filePath).split('/').pop() ?? '';
    if (name in files) return files[name];
    throw new Error(`ENOENT: ${filePath}`);
  });
}

describe('getAllPosts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('parses a valid markdown post file', async () => {
    setupFsMock({
      '2024-01-15_01_hello-world.md': MOCK_POST_MD,
    });

    const { getAllPosts } = await import('./posts');
    const posts = getAllPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      slug: '2024-01-15_hello-world',
      date: '2024-01-15',
      title: 'Test Post',
      author: 'Alice',
      category: 'Tech',
    });
  });

  it('filters out posts with publish: false', async () => {
    setupFsMock({
      '2024-01-15_01_published.md': MOCK_POST_MD,
      '2024-01-16_01_draft.md': UNPUBLISHED_POST_MD,
    });

    const { getAllPosts } = await import('./posts');
    const posts = getAllPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Test Post');
  });

  it('ignores files that do not match the filename pattern', async () => {
    setupFsMock({
      'README.md': MOCK_POST_MD,
      '2024-01-15_01_valid.md': MOCK_POST_MD,
    });

    const { getAllPosts } = await import('./posts');
    const posts = getAllPosts();

    expect(posts).toHaveLength(1);
  });

  it('sorts posts by date descending', async () => {
    setupFsMock({
      '2024-01-01_01_older.md': MOCK_POST_MD.replace('Test Post', 'Older'),
      '2024-06-15_01_newer.md': MOCK_POST_MD.replace('Test Post', 'Newer'),
    });

    const { getAllPosts } = await import('./posts');
    const posts = getAllPosts();

    expect(posts[0].date).toBe('2024-06-15');
    expect(posts[1].date).toBe('2024-01-01');
  });

  it('caches the result on repeated calls', async () => {
    setupFsMock({
      '2024-01-15_01_hello.md': MOCK_POST_MD,
    });

    const { getAllPosts } = await import('./posts');
    getAllPosts();
    getAllPosts();

    // readdirSync should only be called once (second call uses cache)
    expect(fs.readdirSync).toHaveBeenCalledTimes(1);
  });
});

describe('getPostsByTag', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('returns posts matching by slug (parenthesized part)', async () => {
    setupFsMock({
      '2024-01-15_01_hello.md': MOCK_POST_MD,
    });

    const { getPostsByTag } = await import('./posts');
    expect(getPostsByTag('CompProg')).toHaveLength(1);
    expect(getPostsByTag('Python')).toHaveLength(1);
    expect(getPostsByTag('JavaScript')).toHaveLength(0);
  });
});

describe('frontmatter validation', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it.each([
    'title',
    'author',
    'category',
  ] as const)('throws when "%s" is missing', async (field) => {
    const broken = MOCK_POST_MD.replace(
      new RegExp(`${field}: [^\n]+`),
      `${field}: ''`
    );
    setupFsMock({ '2024-01-15_01_broken.md': broken });

    const { getAllPosts } = await import('./posts');
    expect(() => getAllPosts()).toThrow(/missing or empty/);
  });

  it('throws when tags is not an array', async () => {
    const broken = MOCK_POST_MD.replace(
      "tags: [Python, '競プロ(CompProg)']",
      'tags: not-an-array'
    );
    setupFsMock({ '2024-01-15_01_broken.md': broken });

    const { getAllPosts } = await import('./posts');
    expect(() => getAllPosts()).toThrow(/"tags" must be an array/);
  });

  it('includes the filename in the error message', async () => {
    const broken = MOCK_POST_MD.replace('title: Test Post', "title: ''");
    setupFsMock({ '2024-01-15_01_broken.md': broken });

    const { getAllPosts } = await import('./posts');
    expect(() => getAllPosts()).toThrow('2024-01-15_01_broken.md');
  });
});

describe('getPostsByCategory', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('returns posts in the given category', async () => {
    setupFsMock({
      '2024-01-15_01_hello.md': MOCK_POST_MD,
    });

    const { getPostsByCategory } = await import('./posts');
    expect(getPostsByCategory('Tech')).toHaveLength(1);
    expect(getPostsByCategory('Other')).toHaveLength(0);
  });
});
