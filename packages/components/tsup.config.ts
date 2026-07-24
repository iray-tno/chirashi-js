import fs from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'esbuild';
import { defineConfig } from 'tsup';

const CLIENT_DIRECTIVE_RE = /^['"]use client['"];?/;

/**
 * esbuild-plugin-preserve-directives doesn't work on Windows: it compares
 * paths from `path.relative()` (backslash-separated on Windows) against
 * esbuild's metafile/source-comment paths (always forward-slash), so the
 * lookup never matches and the directive silently gets dropped. This is a
 * minimal local replacement using normalized (forward-slash) paths.
 */
function preserveUseClientPlugin(): Plugin {
  return {
    name: 'preserve-use-client',
    setup(build) {
      const clientFiles = new Set<string>();

      build.onLoad({ filter: /\.(t|j)sx?$/ }, async (args) => {
        if (args.path.includes('node_modules')) return null;
        const contents = await fs.readFile(args.path, 'utf8');
        if (CLIENT_DIRECTIVE_RE.test(contents.trimStart())) {
          // esbuild's bundle comments/metafile use the path relative to
          // cwd with forward slashes, not the absolute onLoad path.
          const relativePath = path
            .relative(process.cwd(), args.path)
            .replaceAll('\\', '/');
          clientFiles.add(relativePath);
        }
        return null;
      });

      build.onEnd((result) => {
        if (!result.outputFiles || clientFiles.size === 0) return;
        for (const file of result.outputFiles) {
          if (file.path.endsWith('.map')) continue;
          const text = file.text;
          const needsDirective = [...clientFiles].some((f) => text.includes(f));
          if (needsDirective && !CLIENT_DIRECTIVE_RE.test(text)) {
            file.contents = Buffer.from(`'use client';\n${text}`);
          }
        }
      });
    },
  };
}

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'mdx/index': 'src/mdx/index.ts',
    'article/index': 'src/article/index.ts',
    'markdown/index': 'src/markdown/index.ts',
    'ui/index': 'src/ui/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [preserveUseClientPlugin()],
});
