import { visit } from 'unist-util-visit';

/**
 * Remark plugin that rewrites relative image paths from content package
 * to absolute web paths served from public/.
 *
 * Example: `../images/articles/foo.jpg` → `/img/articles/foo.jpg`
 */
export default function remarkRewriteImages(): (tree: any) => void {
  return (tree) => {
    visit(tree, 'image', (node: any) => {
      if (typeof node.url !== 'string') return;
      if (node.url.startsWith('http')) return;

      // Rewrite ../images/ paths to /img/ (web-served from public/img/)
      const match = node.url.match(/\.\.\/images\/(.+)/);
      if (match) {
        node.url = `/img/${match[1]}`;
      }
    });
  };
}
