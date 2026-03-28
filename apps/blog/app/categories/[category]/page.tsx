import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getPostsByCategory,
  parseTag,
} from '@/lib/posts';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return {
    title: `${category} | Chiranoura Blog`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/categories"
        className="mb-8 inline-block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        &larr; All categories
      </Link>

      <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {category}
      </h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="group">
              <Link
                href={`/posts/${post.slug}`}
                className="-m-4 block rounded-lg p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <time className="text-sm text-zinc-500 dark:text-zinc-400">
                  {post.date}
                </time>
                <h2 className="mt-1 text-xl font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      #{parseTag(tag).display}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
