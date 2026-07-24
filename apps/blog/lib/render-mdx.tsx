import { evaluate } from '@mdx-js/mdx';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeImgSizeSafe from './rehype-img-size-safe';
import remarkRewriteImages from './remark-rewrite-images';

export async function compileMdx(source: string) {
  const { default: MDXContent } = await evaluate(source, {
    Fragment,
    jsx: jsx as any,
    jsxs: jsxs as any,
    remarkPlugins: [remarkRewriteImages],
    rehypePlugins: [
      [rehypeImgSizeSafe, { dir: 'public' }],
      [
        rehypePrettyCode,
        { theme: { dark: 'github-dark', light: 'github-light' } },
      ],
    ],
  } as any);
  return MDXContent;
}
