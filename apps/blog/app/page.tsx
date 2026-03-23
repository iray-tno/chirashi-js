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
            <article className="group">
              <Link
                href={`/posts/${post.slug}`}
                className="block rounded-lg p-4 -m-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <time className="text-sm text-zinc-500 dark:text-zinc-400">
                  {post.date}
                </time>
                <h2 className="mt-1 text-xl font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                    {post.category}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      #{tag}
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
