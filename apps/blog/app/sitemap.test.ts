import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs');

import * as fs from 'node:fs';

const MOCK_POST = `---
title: Hello World
author: Alice
category: Tech
tags: []
---
Body.
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

describe('sitemap', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('exports force-static for static export compatibility', async () => {
    setupFsMock({});
    const { dynamic } = await import('./sitemap');
    expect(dynamic).toBe('force-static');
  });

  it('includes static pages and post entries', async () => {
    setupFsMock({ '2024-01-15_01_hello-world.md': MOCK_POST });
    const { default: sitemap } = await import('./sitemap');
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/nobody\.jp$/),
        expect.stringMatching(/\/categories$/),
        expect.stringMatching(/\/tags$/),
        expect.stringMatching(/\/posts\/2024-01-15_hello-world$/),
      ])
    );
  });

  it('sets lastModified from post date', async () => {
    setupFsMock({ '2024-01-15_01_hello-world.md': MOCK_POST });
    const { default: sitemap } = await import('./sitemap');
    const entries = sitemap();
    const post = entries.find((e) => e.url.includes('/posts/'));

    expect(post?.lastModified).toEqual(new Date('2024-01-15'));
  });
});
