import {
  Anchor,
  Blockquote,
  Heading,
  Table,
  TableCell,
  TableHead,
} from '@chirashi/components/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type React from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { MarkdownImage } from '@/components/MarkdownImage';
import { DisqusComments } from '@/components/DisqusComments';
import { getAllSlugs, getPostBySlug, parseTag } from '@/lib/posts';
import rehypeImgSizeSafe from '@/lib/rehype-img-size-safe';
import remarkRewriteImages from '@/lib/remark-rewrite-images';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Chiranoura Blog`,
    description: `${post.title} - ${post.category}`,
    openGraph: {
      title: post.title,
      description: `${post.title} - ${post.category}`,
      type: 'article',
      url: `/posts/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

async function renderMarkdown(content: string): Promise<React.JSX.Element> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRewriteImages)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeImgSizeSafe as any, { dir: 'public' })
    .use(rehypePrettyCode, {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
    })
    .use(rehypeReact as any, {
      Fragment,
      jsx: jsx as any,
      jsxs: jsxs as any,
      components: {
        a: Anchor as any,
        h1: (props: any) => <Heading level={1} {...props} />,
        h2: (props: any) => <Heading level={2} {...props} />,
        h3: (props: any) => <Heading level={3} {...props} />,
        h4: (props: any) => <Heading level={4} {...props} />,
        h5: (props: any) => <Heading level={5} {...props} />,
        h6: (props: any) => <Heading level={6} {...props} />,
        blockquote: Blockquote as any,
        table: Table as any,
        thead: TableHead as any,
        th: (props: any) => <TableCell isHeader {...props} />,
        td: TableCell as any,
        img: MarkdownImage as any,
      },
    })
    .process(content);
  return result.result as React.JSX.Element;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const rendered = await renderMarkdown(post.content);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        &larr; Back to posts
      </Link>

      <article>
        <header className="mb-8">
          <time className="text-sm text-zinc-500 dark:text-zinc-400">
            {post.date}
          </time>
          <Heading
            level={1}
            className="mt-2 tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {post.title}
          </Heading>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              href={`/categories/${post.category}`}
              className="rounded bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              {post.category}
            </Link>
            {post.tags.map((tag) => {
              const { display, slug } = parseTag(tag);
              return (
                <Link
                  key={tag}
                  href={`/tags/${slug}`}
                  className="text-xs text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                >
                  #{display}
                </Link>
              );
            })}
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {rendered}
        </div>

        <div className="mt-16">
          <DisqusComments
            identifier={post.legacyPath}
            url={`http://chiraoura.nobody.jp${post.legacyPath}`}
            title={post.title}
          />
        </div>
      </article>
    </div>
  );
}
