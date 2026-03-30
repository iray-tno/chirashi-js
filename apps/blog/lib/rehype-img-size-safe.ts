import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';
import { visit } from 'unist-util-visit';

interface Options {
  dir: string;
}

/**
 * Safe version of rehype-img-size: injects width/height into img nodes,
 * but skips gracefully when the image file is missing instead of throwing ENOENT.
 */
export default function rehypeImgSizeSafe(
  options: Options
): (tree: any) => void {
  return (tree) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'img') return;

      const src = node.properties?.src;
      if (typeof src !== 'string' || src.startsWith('http')) return;

      const filePath = path.join(process.cwd(), options.dir, src);
      try {
        const buffer = fs.readFileSync(filePath);
        const { width, height } = imageSize(buffer);
        if (width) node.properties.width = width;
        if (height) node.properties.height = height;
      } catch {
        // Missing image — skip silently rather than crashing the build
      }
    });
  };
}
