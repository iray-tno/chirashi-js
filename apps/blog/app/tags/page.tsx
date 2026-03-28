import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export const metadata = {
  title: 'Tags | Chiranoura Blog',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Tags
      </h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const count = getPostsByTag(tag).length;
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              #{tag}
              <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                ({count})
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
