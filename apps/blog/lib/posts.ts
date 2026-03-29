import fs from 'node:fs';
import path from 'node:path';
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

function parseFilename(
  filename: string
): { date: string; slug: string } | null {
  const match = filename.match(FILENAME_REGEX);
  if (!match) return null;
  return { date: match[1], slug: `${match[1]}_${match[2]}` };
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

export interface PostWithContent extends Post {
  content: string;
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const parsed = parseFilename(file);
    if (!parsed || parsed.slug !== slug) continue;

    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    if (frontmatter.publish === false) return null;

    return {
      slug: parsed.slug,
      date: parsed.date,
      title: frontmatter.title,
      author: frontmatter.author,
      category: frontmatter.category,
      tags: frontmatter.tags ?? [],
      content,
    };
  }

  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

const TAG_REGEX = /^(.+)\(([^)]+)\)$/;

/**
 * Parse a tag like "競プロ(CompProg)" into { display: "競プロ", slug: "CompProg" }.
 * Plain tags like "Python" return { display: "Python", slug: "Python" }.
 */
export function parseTag(tag: string): { display: string; slug: string } {
  const match = tag.match(TAG_REGEX);
  if (match) {
    return { display: match[1], slug: match[2] };
  }
  return { display: tag, slug: tag };
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => parseTag(t).slug === tagSlug)
  );
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map((post) => post.category));
  return [...categories].sort();
}

export function getAllTags(): string[] {
  const tags = new Set(getAllPosts().flatMap((post) => post.tags));
  return [...tags].sort();
}
