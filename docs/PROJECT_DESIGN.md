# Project Design Document: Chiranoura Blog Renewal

## 1. Project Overview

Migrate the existing Gatsby-based blog (`chirashi-js`) to Next.js (App Router) with technical and functional improvements in a **monorepo structure**. Content from the separate `chiranoura-blog` repository will be merged into the monorepo under `packages/content/`, enabling seamless MDX and React component integration.

**Final Goal:**

* **Tech:** Next.js (SSG) + Tailwind CSS + AWS (S3/CloudFront)
* **UX:** Bilingual support (i18n), fast page transitions, full mobile responsiveness
* **Features:**
  * Interactive articles using MDX (React components)
  * Rich visualization for algorithms and low-level explanations
  * Learning features (Anki export, GitHub integration)
  * Series functionality, tag/category management

---

## 2. Technical Stack Requirements

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Monorepo:** pnpm workspaces, multi-package structure
* **Content:** MDX (`next-mdx-remote/rsc` or `contentlayer`), `gray-matter` for Frontmatter
* **Math:** `rehype-katex`, `remark-math`
* **Highlight:** `rehype-pretty-code` (Shiki based)
* **Diagram:** `rehype-mermaid` (optional)
* **Infra:** AWS S3, CloudFront, Route53, GitHub Actions
* **Package Structure:**
  * `apps/blog` - Main Next.js application
  * `packages/components` - Shared React component library
  * `packages/content` - Article content (MDX files)

---

## 3. Migration Strategy: Progressive Approach

**⚠️ Important:** This is NOT a drastic rewrite. Both Gatsby and Next.js will run side-by-side during migration.

### Why Progressive Migration?

* **Zero Risk:** Existing Gatsby site stays untouched and running
* **Incremental Value:** Ship new features immediately without waiting for 100% completion
* **User Continuity:** No disruption to existing readers
* **Easy Rollback:** Can revert individual features if needed
* **Performance Testing:** A/B test Next.js performance before full migration

### Architecture: Path-Based Routing

Use CloudFront to route different URL paths to different S3 origins:

```
CloudFront Distribution (blog.chiranoura.com)
├── /posts/*        → Next.js (S3 bucket: next-app)
├── /series/*       → Next.js (S3 bucket: next-app)
├── /tags/*         → Next.js (S3 bucket: next-app)
├── /en/*           → Next.js (S3 bucket: next-app) [new i18n routes]
├── /ja/*           → Next.js (S3 bucket: next-app) [new i18n routes]
└── /*              → Gatsby (S3 bucket: gatsby-app) [existing, fallback]
```

**Migration Flow:**
1. Deploy Next.js to separate S3 bucket
2. Configure CloudFront with multiple origins
3. Add path patterns to route new features to Next.js
4. Gradually expand Next.js coverage
5. Deprecate Gatsby only when ready

---

## 4. Implementation Roadmap (Step-by-Step)

AI assistants should be given instructions for each phase and proceed to the next only after completion confirmation.

### Phase 0: Progressive Setup (Side-by-Side Deployment + Monorepo)

**Purpose:** Set up monorepo structure and Next.js alongside Gatsby without disrupting existing site.

1. **Monorepo Initialization:**
   * Install pnpm: `npm install -g pnpm`
   * Create `pnpm-workspace.yaml` in root
   * Create directory structure:
     - `apps/blog/` - Next.js application
     - `apps/legacy-gatsby/` - Move current Gatsby temporarily
     - `packages/components/` - Shared React components
     - `packages/content/` - Content (to be migrated)
   * Initialize workspace: `pnpm init`
   * See detailed steps in `docs/MONOREPO_MIGRATION.md`

2. **Content Migration:**
   * Use `git subtree` to merge `chiranoura-blog` repo into `packages/content/`
   * Preserve git history of content changes
   * Alternative: Manual copy if history not needed
   * Create validation scripts for frontmatter

3. **Component Package Setup:**
   * Initialize `@chiranoura/components` package
   * Set up TypeScript + tsup for building
   * Create MDX component structure
   * Configure exports for `mdx` and `article` components

4. **Next.js App Creation:**
   * Initialize Next.js in `apps/blog/` with TypeScript + Tailwind
   * Configure workspace dependencies (`@chiranoura/components`, `@chiranoura/content`)
   * Set up Contentlayer or MDX configuration
   * Create `mdx-components.tsx` for component registry

5. **AWS Infrastructure:**
   * Create new S3 bucket for Next.js (`blog-next`)
   * Keep existing Gatsby S3 bucket (`blog-gatsby`)
   * Configure CloudFront with two origins:
     - Origin 1: Gatsby S3 bucket (default/fallback)
     - Origin 2: Next.js S3 bucket (for new paths)

6. **CloudFront Path Patterns:**
   * Create cache behaviors for Next.js paths (order matters - specific paths first):
     - `/posts/*` → Next.js origin
     - `/series/*` → Next.js origin
     - `/tags/*` → Next.js origin
     - `/en/*` → Next.js origin
     - `/ja/*` → Next.js origin
     - `/*` → Gatsby origin (default)

7. **Dual GitHub Actions:**
   * Keep existing Gatsby workflow
   * Add new Next.js workflow for monorepo build:
     - Install pnpm
     - Install workspace dependencies: `pnpm install --frozen-lockfile`
     - Build blog: `pnpm --filter blog build`
     - Deploy to separate S3 bucket
   * Both workflows deploy independently

8. **Verification:**
   * Workspace installation works: `pnpm install`
   * Gatsby site still accessible at root paths
   * Next.js app runs: `pnpm --filter blog dev`
   * Components importable in blog app
   * Content accessible from packages/content/

### Phase 1: MVP Migration (Next.js First Routes)

**Purpose:** Create working Next.js blog pages using monorepo content and components.

**Prerequisites:** Phase 0 complete (monorepo set up, content migrated, components package initialized)

1. **Content Layer Setup:**
   * Install Contentlayer: `pnpm add -D contentlayer next-contentlayer`
   * Create `contentlayer.config.ts` in `apps/blog/`
   * Point to content: `contentDirPath: '../../packages/content/posts'`
   * Define Post document type with frontmatter schema

2. **MDX Component Integration:**
   * Create `mdx-components.tsx` in `apps/blog/`
   * Import components from `@chiranoura/components/mdx`
   * Register components for use in MDX files

3. **Article Pages:**
   * Create `app/posts/[slug]/page.tsx`
   * Use Contentlayer's generated types
   * Render MDX with `useMDXComponent` hook
   * Implement Next.js equivalents of Gatsby components (images, links)

4. **Build & Deploy:**
   * Configure `next.config.js` for SSG: `output: 'export'`
   * Set up `next-image-export-optimizer` for S3
   * Verify build: `pnpm --filter blog build`
   * **Deploy only to Next.js S3 bucket** - Gatsby unchanged

5. **Testing:**
   * Verify MDX components render correctly
   * Test component imports work in MDX
   * Confirm TypeScript validates component props
   * Check hot reload for content changes

### Phase 2: URL Design and Structuring (Routing & Data)

**Purpose:** Establish multilingual support and navigation structure.

1. **Directory structure changes:**
   * `app/[lang]/posts/[slug]/page.tsx`
   * `app/[lang]/tags/[tag]/page.tsx`
   * `app/[lang]/series/[series]/page.tsx`

2. **Enhanced Frontmatter parsing:**
   * Define types and implement reading logic for `lang`, `series`, `seriesOrder` properties.

3. **Middleware/Redirects:**
   * Redirect root (`/`) access to browser language or default (`ja`).

### Phase 3: Infrastructure Setup (AWS & CI/CD)

**Purpose:** Create an environment that auto-deploys on GitHub push.

1. **AWS Setup:**
   * Create S3 bucket (static hosting or OAC settings).
   * Create CloudFront distribution.

2. **GitHub Actions:**
   * Build Next.js (`output: export`).
   * Sync to S3 (`aws s3 sync`).
   * Invalidate CloudFront cache (`aws cloudfront create-invalidation`).

3. **Image Optimization:** Introduce `next-image-export-optimizer` (for S3 deployment).

### Phase 4: Feature Enhancement (Feature Implementation)

**Purpose:** Implement added value as a blog.

1. **Visual Components:**
   * Apply syntax highlighting, math rendering (KaTeX).
   * Implement `History`, `Blame`, `Issue` link components.

2. **Interactive:**
   * Implement Anki CSV export functionality.
   * Create base Playground component for algorithm visualization.

---

## 5. Data Structure Definitions

### Frontmatter Schema

Header definition for article Markdown (`.md` / `.mdx`).

```typescript
type Frontmatter = {
  title: string;       // Article title
  date: string;        // YYYY-MM-DD
  lang: 'ja' | 'en';   // Language
  slug: string;        // Common URL slug for both languages
  category: string;    // Single category (e.g., Tech, Diary)
  tags: string[];      // Multiple tags (e.g., React, AWS)
  series?: string;     // Series ID (optional)
  seriesOrder?: number;// Order within series
  published: boolean;  // Publication flag
};
```

### URL Structure

* `/[lang]/` : Top Page
* `/[lang]/posts/[slug]` : Article Detail
* `/[lang]/category/[category]` : Category Archive
* `/[lang]/tags/[tag]` : Tag Archive
* `/[lang]/series/[series]` : Series Archive

---

## 6. AI Assistant Prompt Examples

Use the following commands with Claude Code or Gemini when starting each phase.

### Phase 0 Start (Progressive Setup + Monorepo)

```text
@docs/PROJECT_DESIGN.md
@docs/MONOREPO_MIGRATION.md

We're doing a PROGRESSIVE migration with MONOREPO structure.
Let's start with Phase 0: Progressive Setup + Monorepo.

Follow these steps:
1. Set up pnpm workspace (apps/, packages/ structure)
2. Migrate content from chiranoura-blog to packages/content/ (preserve git history)
3. Create @chiranoura/components package with TypeScript + tsup
4. Initialize Next.js in apps/blog/ with workspace dependencies
5. Configure AWS with two S3 buckets (Gatsby existing + Next.js new)
6. Set up CloudFront multi-origin with path-based routing
7. Configure dual GitHub Actions for monorepo builds

The goal: Monorepo with Gatsby and Next.js running side-by-side, zero disruption.
```

### Phase 1 Start (MDX Integration)

```text
@docs/PROJECT_DESIGN.md
@docs/MONOREPO_MIGRATION.md

Phase 0 complete: Monorepo is set up, content migrated, components package ready.
Let's proceed with Phase 1: MVP Migration.

Tasks:
1. Install and configure Contentlayer in apps/blog/
2. Create contentlayer.config.ts pointing to ../../packages/content/posts
3. Set up mdx-components.tsx to use @chiranoura/components
4. Create app/posts/[slug]/page.tsx with MDX rendering
5. Configure next.config.js for SSG export
6. Test that MDX components work in articles

Remember: This deploys to Next.js S3 bucket only. Gatsby stays unchanged.
Verify: Component imports in MDX files, TypeScript validation, hot reload.
```

### Phase 2 Structuring

```text
Phase 1 is complete. Let's proceed to Phase 2: URL Design and Structuring.
For i18n support, change to `app/[lang]/...` directory structure and
implement logic to distribute articles based on Frontmatter's `lang` property.
Also, please create a series listing page (`series`) functionality.
```

### Phase 3 AWS

```text
Let's proceed with Phase 3: Infrastructure Setup.
Please create YAML files for GitHub Actions and necessary AWS CLI command procedures
to configure Next.js SSG build (output: export) settings and
deploy to AWS S3 + CloudFront via GitHub Actions.
Use `next-image-export-optimizer` for image optimization.
```

### Phase 4 Feature Implementation

```text
Phase 4: Feature Enhancement. Please create the following two React components:
1. A button that collects specific elements from articles and downloads them as Anki CSV.
2. A footer component that generates links to GitHub History / Blame / Issue from the article file path.
```

---

## 7. Development Workflow

For detailed development workflow (branching, commits, PRs), see:
* `.claude/commands/workflow.md`

Key points:
* Create issues before starting work
* Branch naming: `feature/issue-{NUMBER}_{description}`
* Commit format: `#{NUMBER} Description`
* PR description must include `Closes #{NUMBER}` for auto-closing issues

---

## 8. Notes

### Progressive Migration Principles

* **No Big Bang:** Never replace the entire site at once
* **Feature Flags:** Use CloudFront path routing as a "feature flag" mechanism
* **Independent Deploys:** Gatsby and Next.js deploy independently without interfering
* **Rollback Ready:** Can remove Next.js paths from CloudFront instantly if issues arise
* **User Experience First:** Readers should never notice the migration happening

### Content Management (Monorepo)

* Content migrated from `chiranoura-blog` repository to `packages/content/` (Phase 0)
* Git history preserved via `git subtree` merge
* Content now lives in monorepo for seamless MDX component integration
* Both Gatsby (temporarily) and Next.js read from monorepo content
* MDX files can directly import React components from `@chiranoura/components`
* TypeScript validates component props used in MDX files
* Focus on maintaining existing functionality while adding new features incrementally
* All changes should be backward compatible with existing content

### Monorepo Structure

* **Workspace Tool:** pnpm workspaces (recommended) or yarn/npm workspaces
* **Package Manager Benefits:**
  * Shared dependencies reduce disk space
  * Faster installs with symlinked packages
  * Type safety across packages
  * Single `node_modules` hoisting
* **Detailed Migration Guide:** See `docs/MONOREPO_MIGRATION.md` for:
  * Step-by-step monorepo setup
  * Git history preservation techniques
  * Workspace configuration examples
  * Component package structure
  * Content migration strategies
  * GitHub Actions for monorepo builds

### Technical Considerations

* Performance and SEO should be prioritized throughout migration
* Monitor CloudFront metrics to compare Gatsby vs Next.js performance
* Test each new Next.js route thoroughly before adding to CloudFront routing
* Keep Gatsby build working until Next.js fully replaces all routes
* Use pnpm for fastest installs and smallest disk footprint
* Leverage workspace protocols (`workspace:*`) for local package dependencies
