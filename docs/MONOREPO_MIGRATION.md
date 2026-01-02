# Monorepo Migration Plan

**Goal:** Migrate from multi-repo (chirashi-js + chiranoura-blog) to a unified monorepo with multi-package workspace structure, enabling seamless MDX component integration.

---

## Table of Contents

1. [Why Monorepo?](#why-monorepo)
2. [Target Structure](#target-structure)
3. [Migration Phases](#migration-phases)
4. [Workspace Configuration](#workspace-configuration)
5. [Content Migration Strategy](#content-migration-strategy)
6. [Git History Preservation](#git-history-preservation)

---

## Why Monorepo?

### Current Pain Points (Multi-repo)

**Repository Structure:**
```
chirashi-js/              # Gatsby build system
chiranoura-blog/          # Markdown content (separate repo)
```

**Problems with MDX:**
1. **Component Import Hell:** MDX files can't import React components from another repo
2. **Version Mismatch:** Content uses old component API, code repo has new API
3. **Testing Difficulty:** Can't test content + components together locally
4. **Build Complexity:** Need Git Submodules or build-time fetching
5. **No Type Safety:** TypeScript can't check component props in MDX

### Monorepo Benefits

**For MDX:**
```mdx
<!-- This "just works" in monorepo -->
import { Visualizer } from '@/components/mdx/Visualizer'

<Visualizer type="bubble-sort" data={[5, 2, 8]} />
```

**Advantages:**
- ✅ Single PR updates component + content together
- ✅ TypeScript validates component props in MDX
- ✅ Local dev server shows real content immediately
- ✅ Atomic deploys (code + content in sync)
- ✅ Shared tooling (ESLint, TypeScript, Prettier)
- ✅ Future: Publish `@chiranoura/components` to npm

---

## Target Structure

### Final Monorepo Layout

```
chiranoura/                          # Root (rename from chirashi-js)
├── .github/
│   └── workflows/
│       ├── blog-deploy.yml         # Deploy main blog
│       └── packages-ci.yml         # Test shared packages
├── apps/                           # Applications (deployable)
│   └── blog/                       # Main Next.js blog app
│       ├── app/                    # App Router
│       ├── public/
│       ├── next.config.js
│       └── package.json
├── packages/                       # Shared packages
│   ├── components/                 # @chiranoura/components
│   │   ├── src/
│   │   │   ├── mdx/               # MDX components
│   │   │   │   ├── Visualizer.tsx
│   │   │   │   ├── Flashcard.tsx
│   │   │   │   └── HexViewer.tsx
│   │   │   └── article/           # Article UI
│   │   │       ├── SeriesNav.tsx
│   │   │       └── TagList.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── content/                    # @chiranoura/content (migrated from chiranoura-blog)
│   │   ├── posts/
│   │   │   └── 2024-01-01-example/
│   │   │       ├── index.ja.mdx
│   │   │       ├── index.en.mdx
│   │   │       └── images/
│   │   ├── package.json
│   │   └── scripts/
│   │       └── validate-frontmatter.ts
│   └── eslint-config/              # @chiranoura/eslint-config (future)
│       └── index.js
├── docs/                           # Documentation
│   ├── PROJECT_DESIGN.md
│   ├── FEATURES.md
│   └── MONOREPO_MIGRATION.md       # This file
├── package.json                    # Root workspace config
├── pnpm-workspace.yaml             # or package.json workspaces
├── turbo.json                      # Optional: Turborepo for caching
└── tsconfig.base.json              # Shared TypeScript config
```

### Package Relationships

```
apps/blog
  ├─→ @chiranoura/components
  └─→ @chiranoura/content

packages/components
  └─→ (standalone, could publish to npm)

packages/content
  └─→ (could depend on @chiranoura/components for type checking)
```

---

## Migration Phases

### Phase 0: Monorepo Setup (Week 1)

**Objective:** Set up workspace infrastructure without disrupting current Gatsby site.

**Steps:**

1. **Choose Package Manager:**
   - Recommended: **pnpm** (fastest, best for monorepos)
   - Alternative: yarn workspaces, npm workspaces

2. **Initialize Workspace:**
   ```bash
   # In chirashi-js root
   pnpm init

   # Create pnpm-workspace.yaml
   echo "packages:
     - 'apps/*'
     - 'packages/*'" > pnpm-workspace.yaml
   ```

3. **Create Directory Structure:**
   ```bash
   mkdir -p apps/blog
   mkdir -p packages/{components,content}
   ```

4. **Move Existing Gatsby:**
   ```bash
   # Keep Gatsby running during migration
   mv src apps/legacy-gatsby/
   # Keep it working until Next.js is ready
   ```

5. **Initialize Next.js App:**
   ```bash
   cd apps/blog
   pnpm create next-app@latest . --typescript --tailwind --app
   ```

6. **Setup Workspace Dependencies:**
   ```json
   // apps/blog/package.json
   {
     "dependencies": {
       "@chiranoura/components": "workspace:*",
       "@chiranoura/content": "workspace:*"
     }
   }
   ```

**Verification:**
- ✅ `pnpm install` succeeds
- ✅ `pnpm --filter blog dev` runs Next.js
- ✅ Gatsby still runs independently

---

### Phase 1: Content Migration (Week 2)

**Objective:** Move content from `chiranoura-blog` repo to `packages/content/`.

**1.1: Preserve Git History (Recommended)**

Use `git subtree` to merge history:

```bash
# In chirashi-js root
git remote add content-repo https://github.com/iray-tno/chiranoura-blog.git
git fetch content-repo

# Merge with history
git subtree add --prefix=packages/content content-repo main --squash

# Or if you want full history (verbose):
git subtree add --prefix=packages/content content-repo main
```

**1.2: Alternative - Manual Copy**

If you don't need history:

```bash
# Clone content repo
git clone https://github.com/iray-tno/chiranoura-blog.git temp-content

# Copy content
cp -r temp-content/posts packages/content/
cp -r temp-content/articles packages/content/  # if exists

# Cleanup
rm -rf temp-content
```

**1.3: Update Content Package**

```json
// packages/content/package.json
{
  "name": "@chiranoura/content",
  "version": "0.1.0",
  "private": true,
  "exports": {
    "./posts/*": "./posts/*"
  }
}
```

**1.4: Content Validation Script**

```typescript
// packages/content/scripts/validate-frontmatter.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Validate all MDX files have required frontmatter
const postsDir = path.join(__dirname, '../posts');
// ... validation logic
```

**Verification:**
- ✅ All posts copied successfully
- ✅ Frontmatter intact
- ✅ Images/assets included
- ✅ Git history preserved (if using subtree)

---

### Phase 2: Component Package Setup (Week 3)

**Objective:** Create shared component library.

**2.1: Initialize Package**

```bash
cd packages/components
pnpm init
```

```json
// packages/components/package.json
{
  "name": "@chiranoura/components",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    "./mdx": "./src/mdx/index.ts",
    "./article": "./src/article/index.ts"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

**2.2: Component Structure**

```typescript
// packages/components/src/mdx/index.ts
export { Visualizer } from './Visualizer';
export { Flashcard, FlashcardFront, FlashcardBack } from './Flashcard';
export { HexViewer } from './HexViewer';
export { CompilerExplorer } from './CompilerExplorer';

// packages/components/src/article/index.ts
export { SeriesNavigation } from './SeriesNavigation';
export { LanguageSwitcher } from './LanguageSwitcher';
export { ArticleActionButtons } from './ArticleActionButtons';
export { AnkiExportButton } from './AnkiExportButton';
```

**2.3: TypeScript Configuration**

```json
// packages/components/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}
```

**Verification:**
- ✅ `pnpm build` generates types
- ✅ Components importable in blog app
- ✅ TypeScript autocomplete works

---

### Phase 3: Blog App Integration (Week 4)

**Objective:** Wire content + components in Next.js app.

**3.1: MDX Configuration**

```javascript
// apps/blog/next.config.js
const { createContentlayerPlugin } = require('next-contentlayer');

const withContentlayer = createContentlayerPlugin();

module.exports = withContentlayer({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true
  }
});
```

**3.2: Content Layer Definition**

```typescript
// apps/blog/contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lang: { type: 'enum', options: ['ja', 'en'], required: true },
    slug: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    series: { type: 'string' },
    seriesOrder: { type: 'number' },
    published: { type: 'boolean', required: true }
  }
}));

export default makeSource({
  contentDirPath: '../../packages/content/posts',
  documentTypes: [Post]
});
```

**3.3: MDX Components Registry**

```typescript
// apps/blog/mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import {
  Visualizer,
  Flashcard,
  FlashcardFront,
  FlashcardBack
} from '@chiranoura/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Visualizer,
    Flashcard,
    FlashcardFront,
    FlashcardBack,
    ...components,
  }
}
```

**3.4: Article Page**

```typescript
// apps/blog/app/[lang]/posts/[slug]/page.tsx
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function PostPage({ params }: {
  params: { lang: string; slug: string }
}) {
  const post = allPosts.find(p =>
    p.slug === params.slug && p.lang === params.lang
  );

  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article>
      <h1>{post.title}</h1>
      <MDXContent />
    </article>
  );
}
```

**Verification:**
- ✅ MDX renders with components
- ✅ Hot reload works for content changes
- ✅ TypeScript checks component props
- ✅ Images load correctly

---

### Phase 4: GitHub Actions Update (Week 5)

**Objective:** Update CI/CD for monorepo deployment.

**4.1: Workspace Build**

```yaml
# .github/workflows/blog-deploy.yml
name: Deploy Blog

on:
  push:
    branches: [main]
    paths:
      - 'apps/blog/**'
      - 'packages/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build blog
        run: pnpm --filter blog build
        env:
          NODE_ENV: production

      - name: Deploy to S3
        run: |
          aws s3 sync apps/blog/out s3://blog-bucket --delete
          aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
```

**4.2: Content Validation CI**

```yaml
# .github/workflows/content-validation.yml
name: Validate Content

on:
  pull_request:
    paths:
      - 'packages/content/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm --filter @chiranoura/content validate

      - name: Check frontmatter
        run: pnpm --filter @chiranoura/content run validate-frontmatter
```

---

## Workspace Configuration

### pnpm Workspace (Recommended)

**pnpm-workspace.yaml:**
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**Root package.json:**
```json
{
  "name": "chiranoura",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter blog dev",
    "build": "pnpm --filter blog build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test",
    "type-check": "pnpm -r type-check"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "turbo": "^1.10.0"
  }
}
```

### Optional: Turborepo for Caching

**turbo.json:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "out/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## Content Migration Strategy

### Handling Legacy Content

**Option A: Convert All to MDX**
```bash
# Rename .md to .mdx
find packages/content -name "*.md" -exec sh -c 'mv "$0" "${0%.md}.mdx"' {} \;
```

**Option B: Support Both**
```javascript
// next.config.js
{
  pageExtensions: ['mdx', 'md']  // Support both
}
```

### Frontmatter Migration

If frontmatter format changed:

```typescript
// scripts/migrate-frontmatter.ts
import { glob } from 'glob';
import matter from 'gray-matter';
import fs from 'fs';

const files = glob.sync('packages/content/**/*.mdx');

files.forEach(file => {
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));

  // Add new required fields
  const updated = {
    ...data,
    published: data.published ?? true,
    lang: data.lang ?? 'ja'
  };

  const newContent = matter.stringify(content, updated);
  fs.writeFileSync(file, newContent);
});
```

---

## Git History Preservation

### Method 1: Git Subtree (Recommended)

**Pros:**
- Preserves full commit history
- Content changes visible in main repo
- No submodule complexity

**Cons:**
- One-time merge only
- Original repo becomes separate

**Commands:**
```bash
# Add remote
git remote add content-source https://github.com/iray-tno/chiranoura-blog.git
git fetch content-source

# Merge with history
git subtree add --prefix=packages/content content-source main

# Future: Archive old repo
# GitHub: Settings → Archive this repository
```

### Method 2: Git Filter-Repo (Advanced)

For cleaner history:

```bash
# Clone content repo
git clone https://github.com/iray-tno/chiranoura-blog.git temp-content
cd temp-content

# Rewrite all paths to packages/content/
git filter-repo --to-subdirectory-filter packages/content

# In main repo
git remote add content-rewritten ../temp-content
git fetch content-rewritten
git merge content-rewritten/main --allow-unrelated-histories
```

---

## Migration Checklist

### Phase 0: Setup
- [ ] Install pnpm
- [ ] Create `pnpm-workspace.yaml`
- [ ] Initialize `apps/` and `packages/` directories
- [ ] Move Gatsby to `apps/legacy-gatsby/` (temporary)
- [ ] Create Next.js app in `apps/blog/`
- [ ] Verify workspace installation works

### Phase 1: Content
- [ ] Decide: subtree vs manual copy
- [ ] Migrate content to `packages/content/`
- [ ] Create validation scripts
- [ ] Update paths in frontmatter (if needed)
- [ ] Test content loading

### Phase 2: Components
- [ ] Create `packages/components/`
- [ ] Set up build tooling (tsup)
- [ ] Create MDX components
- [ ] Export component library
- [ ] Verify types generation

### Phase 3: Integration
- [ ] Configure Contentlayer/MDX in blog app
- [ ] Create `mdx-components.tsx`
- [ ] Build article pages
- [ ] Test component imports in MDX
- [ ] Verify hot reload

### Phase 4: CI/CD
- [ ] Update GitHub Actions for monorepo
- [ ] Add content validation workflow
- [ ] Update deployment scripts
- [ ] Test full build locally
- [ ] Deploy to staging

### Phase 5: Cleanup
- [ ] Remove `apps/legacy-gatsby/`
- [ ] Archive `chiranoura-blog` repo
- [ ] Update README
- [ ] Update contributor docs
- [ ] Celebrate! 🎉

---

## Rollback Plan

If migration fails at any phase:

1. **Phase 0-2:** Simply delete new directories, keep Gatsby running
2. **Phase 3:** Revert Next.js changes, keep using Gatsby
3. **Phase 4:** Revert GitHub Actions, redeploy old workflow
4. **After cutover:** Keep old repo as archive for 3 months

---

## Future Enhancements

Once monorepo is stable:

### 1. Component Storybook
```bash
pnpm add -D @storybook/react
# Document components visually
```

### 2. Publish Packages (Optional)
```bash
# If components become useful to others
pnpm --filter @chiranoura/components publish
```

### 3. Add More Apps
```
apps/
├── blog/           # Main blog
├── admin/          # Content management UI (future)
└── playground/     # Algorithm playground (future)
```

### 4. Shared Configs
```
packages/
├── eslint-config/
├── tsconfig/
└── tailwind-config/
```

---

## AI Assistant Prompts

### Phase 0: Monorepo Setup
```
@docs/MONOREPO_MIGRATION.md

I need to set up a pnpm workspace monorepo.
Follow Phase 0 instructions to:
1. Create workspace configuration
2. Initialize directory structure
3. Set up Next.js in apps/blog/
4. Configure workspace dependencies

Current structure: Gatsby in root
Target: Monorepo with apps/ and packages/
```

### Phase 1: Content Migration
```
@docs/MONOREPO_MIGRATION.md

Phase 1: Content Migration
Use git subtree to merge chiranoura-blog repository into packages/content/
while preserving git history.
Repository: https://github.com/iray-tno/chiranoura-blog
```

### Phase 2: Component Package
```
@docs/MONOREPO_MIGRATION.md

Phase 2: Create @chiranoura/components package
Set up TypeScript, tsup build tooling, and exports.
Create initial MDX component structure (Visualizer, Flashcard).
```

---

**Last Updated:** 2026-01-02
**Estimated Total Time:** 4-5 weeks (can be compressed if working full-time)
