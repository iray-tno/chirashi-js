import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs');

import * as fs from 'node:fs';

const MOCK_POST = `---
title: Hello World
author: Alice
category: Tech
tags: ['Python']
---
Body text.
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

describe('feed.xml route', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('exports force-static for static export compatibility', async () => {
    setupFsMock({});
    const { dynamic } = await import('./route');
    expect(dynamic).toBe('force-static');
  });

  it('returns application/rss+xml content-type', async () => {
    setupFsMock({ '2024-01-15_01_hello-world.md': MOCK_POST });
    const { GET } = await import('./route');
    const response = await GET();
    expect(response.headers.get('Content-Type')).toMatch('application/rss+xml');
  });

  it('returns valid RSS XML with channel and items', async () => {
    setupFsMock({ '2024-01-15_01_hello-world.md': MOCK_POST });
    const { GET } = await import('./route');
    const response = await GET();
    const xml = await response.text();

    expect(xml).toMatch(/^<\?xml/);
    expect(xml).toContain('<rss');
    expect(xml).toContain('<channel>');
    expect(xml).toContain('<item>');
    expect(xml).toContain('Hello World');
    expect(xml).toContain('Alice');
  });
});
