import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { SITE_URL } from '@/lib/config';
import { getAllPosts, getPostBySlug, parseTag } from '@/lib/posts';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(result);
}

export async function GET() {
  const posts = getAllPosts();

  const itemsHtml = await Promise.all(
    posts.map(async (post) => {
      const full = getPostBySlug(post.slug);
      const contentHtml = full ? await markdownToHtml(full.content) : '';

      const tags = post.tags.map((t) => {
        const { display } = parseTag(t);
        return `      <category>${escapeXml(display)}</category>`;
      });

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
${tags.join('\n')}
      <description><![CDATA[${contentHtml}]]></description>
    </item>`;
    })
  );

  const lastBuildDate =
    posts.length > 0
      ? new Date(posts[0].date).toUTCString()
      : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chiranoura Blog</title>
    <link>${SITE_URL}</link>
    <description>Blog by iray_tno</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsHtml.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
