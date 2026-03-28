import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Chiranoura Blog
      </h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="rounded-lg p-4 -m-4">
              <time className="text-sm text-zinc-500 dark:text-zinc-400">
                {post.date}
              </time>
              <h2 className="mt-1 text-xl font-semibold">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Link
                  href={`/categories/${post.category}`}
                  className="rounded bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                >
                  {post.category}
                </Link>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-xs text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
