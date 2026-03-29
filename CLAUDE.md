# CLAUDE.md - Project Guide for AI Agents

## Project Overview

Chiranoura Blog - a monorepo migrating from Gatsby to Next.js. The legacy Gatsby site still exists at root level; the new blog lives in `apps/blog/`.

## Monorepo Structure

```
chirashi-js/
├── apps/
│   └── blog/              # Next.js 16 blog (App Router, React 19, Tailwind v4)
├── packages/
│   ├── components/        # @chirashi/components - Shared React components (React 18, tsup, Biome, Vitest, Storybook 9)
│   └── content/           # @chirashi/content - Markdown blog posts
├── docs/                  # Architecture docs, migration guide, feature specs
├── .claude/commands/      # Slash commands (e.g. /workflow)
├── src/                   # Legacy Gatsby source (do not modify)
└── articles/              # Legacy content (do not modify)
```

## Key Architecture

### Blog (`apps/blog/`)
- **Rendering pipeline**: unified -> remark-parse -> remark-rehype -> rehype-pretty-code (syntax highlighting) -> rehype-react (renders custom components)
- **Content loading**: `apps/blog/lib/posts.ts` reads markdown from `packages/content/posts/`, parses frontmatter with gray-matter
- **Post filename pattern**: `YYYY-MM-DD_NN_slug.md` (date, sequence number, slug)
- **Slug format**: `{date}_{slug}` (e.g. `2014-03-04_how_to_install_pip`)
- **Tag format**: Tags like `"競プロ(CompProg)"` use the parenthesized token as URL slug and the prefix as display name. Use `parseTag()` from `lib/posts.ts`.
- **Routes**: `/`, `/posts/[slug]`, `/categories`, `/categories/[category]`, `/tags`, `/tags/[tag]`

### Components (`packages/components/`)
- Exports via subpaths: `@chirashi/components`, `@chirashi/components/markdown`, `@chirashi/components/article`, `@chirashi/components/mdx`
- Markdown components (Anchor, Heading, Blockquote, Table, Image) are wired into the blog's rehype-react pipeline
- **Must build before blog can use them**: `npm run build --workspace=@chirashi/components`
- Uses React 18 (blog uses React 19) - use `as any` casts for cross-version type mismatches

### Content (`packages/content/`)
- Markdown posts with YAML frontmatter: title, author, category, tags, publish
- Posts with `publish: false` are filtered out

## Development Workflow

**Always follow**: Create Issue -> Branch -> Small Commits -> PR -> Merge

See `/workflow` slash command or `.claude/commands/workflow.md` for full details.

### Branch naming
```
feature/issue-{NUMBER}_{brief-description}
```

### Commit format
```
#{ISSUE_NUMBER} Short description

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

Keep commits small and atomic. Commit after each logical step.

### PR body must include
```
Closes #{ISSUE_NUMBER}
```

## Critical Tips

### npm install
**Always use `--legacy-peer-deps`** due to Storybook/React version conflicts:
```bash
npm install --legacy-peer-deps
npm install <package> --workspace=blog --legacy-peer-deps
```

### Build order matters
Components must be built before the blog:
```bash
npm run build --workspace=@chirashi/components
npm run build --workspace=blog
```

### React version split
- `apps/blog/` uses React 19
- `packages/components/` uses React 18 with `overrides` to pin it
- When importing components into the blog, type mismatches are expected - use `as any`

### Stale `.next` directory
If blog build hangs, remove the lock/cache:
```bash
rm -rf apps/blog/.next
```

### Tailwind v4 syntax
Uses `@plugin` directive, not `@import` for plugins:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

### Old `@types/rehype-react` in root
Root has outdated `@types/rehype-react@6` that conflicts with rehype-react v8's bundled types. Use `as any` casts for rehype-react options and result.

## Common Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build blog | `npm run build --workspace=blog` |
| Build components | `npm run build --workspace=@chirashi/components` |
| Run tests | `npm test --workspace=@chirashi/components` |
| Storybook | `npm run storybook` |
| Type check | `npm run type-check --workspace=@chirashi/components` |
| Lint/format | `npm run check:fix --workspace=@chirashi/components` |
| Fresh install | `npm run fresh-install` |

## Documentation

- `docs/PROJECT_DESIGN.md` - Architecture and migration strategy
- `docs/FEATURES.md` - Feature specifications
- `docs/NPM_SCRIPTS.md` - Complete npm scripts reference
- `docs/MONOREPO_MIGRATION.md` - Migration guide
- `.claude/commands/workflow.md` - Git workflow details
