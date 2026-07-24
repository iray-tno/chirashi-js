import fs from 'node:fs';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';

const POSTS_DIR = path.join(process.cwd(), '../../packages/content/posts');

describe('MDX compile compatibility', () => {
  it('compiles every post body as MDX without errors', async () => {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
    expect(files.length).toBeGreaterThan(0);

    const failures: string[] = [];

    for (const file of files) {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { content } = matter(raw);
      try {
        await compile(content);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${file}: ${message}`);
      }
    }

    expect(failures).toEqual([]);
  });
});
