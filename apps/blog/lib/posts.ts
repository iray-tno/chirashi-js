import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), '../../packages/content/posts');

export interface Post {
  slug: string;
  date: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
}

interface PostFrontmatter {
  title: string;
  author: string;
  category: string;
  tags: string[];
  changefreq?: string;
  priority?: number;
  publish?: boolean;
}

const FILENAME_REGEX = /^(\d{4}-\d{2}-\d{2})_\d{2}_(.+)\.md$/;

function parseFilename(filename: string): { date: string; slug: string } | null {
  const match = filename.match(FILENAME_REGEX);
  if (!match) return null;
  return { date: match[1], slug: match[2] };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  const posts: Post[] = [];

  for (const file of files) {
    const parsed = parseFilename(file);
    if (!parsed) continue;

    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    if (frontmatter.publish === false) continue;

    posts.push({
      slug: parsed.slug,
      date: parsed.date,
      title: frontmatter.title,
      author: frontmatter.author,
      category: frontmatter.category,
      tags: frontmatter.tags ?? [],
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));

  return posts;
}
