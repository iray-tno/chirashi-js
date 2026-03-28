import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag, parseTag } from '@/lib/posts';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: parseTag(tag).slug }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const allTags = getAllTags();
  const rawTag = allTags.find((t) => parseTag(t).slug === tag);
  const display = rawTag ? parseTag(rawTag).display : tag;
  return {
    title: `#${display} | Chiranoura Blog`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: tagSlug } = await params;
  const posts = getPostsByTag(tagSlug);

  if (posts.length === 0) {
    notFound();
  }

  const allTags = getAllTags();
  const rawTag = allTags.find((t) => parseTag(t).slug === tagSlug);
  const display = rawTag ? parseTag(rawTag).display : tagSlug;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/tags"
        className="mb-8 inline-block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        &larr; All tags
      </Link>

      <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        #{display}
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
                  <span className="rounded bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                    {post.category}
                  </span>
                  {post.tags.map((t) => {
                    const parsed = parseTag(t);
                    return (
                      <span
                        key={t}
                        className="text-xs text-zinc-500 dark:text-zinc-400"
                      >
                        #{parsed.display}
                      </span>
                    );
                  })}
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
