# Project Design Document: Chiranoura Blog Renewal

## 1. Project Overview

Migrate the existing Gatsby-based blog (`chirashi-js`) to Next.js (App Router) with technical and functional improvements. Content (Markdown files) is managed in a separate repository (`chiranoura-blog`) and will be accessed via Git Submodule or fetched during build time.

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
* **Content:** MDX (`next-mdx-remote/rsc` or `@next/mdx`), `gray-matter` for Frontmatter
* **Math:** `rehype-katex`, `remark-math`
* **Highlight:** `rehype-pretty-code` (Shiki based)
* **Diagram:** `rehype-mermaid` (optional)
* **Infra:** AWS S3, CloudFront, Route53, GitHub Actions

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

### Phase 0: Progressive Setup (Side-by-Side Deployment)

**Purpose:** Set up Next.js alongside Gatsby without disrupting existing site.

1. **Create Next.js Project:**
   * New directory: `nextjs-app/` (separate from Gatsby)
   * Initialize with `create-next-app` + TypeScript + Tailwind

2. **AWS Infrastructure:**
   * Create new S3 bucket for Next.js (`blog-next`)
   * Keep existing Gatsby S3 bucket (`blog-gatsby`)
   * Configure CloudFront with two origins:
     - Origin 1: Gatsby S3 bucket (default/fallback)
     - Origin 2: Next.js S3 bucket (for new paths)

3. **CloudFront Path Patterns:**
   * Create cache behaviors for Next.js paths (order matters - specific paths first):
     - `/posts/*` → Next.js origin
     - `/series/*` → Next.js origin
     - `/tags/*` → Next.js origin
     - `/en/*` → Next.js origin
     - `/ja/*` → Next.js origin
     - `/*` → Gatsby origin (default)

4. **Dual GitHub Actions:**
   * Keep existing Gatsby workflow
   * Add new Next.js workflow deploying to separate bucket
   * Both can deploy independently

5. **Verification:**
   * Gatsby site still accessible at root paths
   * Next.js ready to serve new paths when implemented

### Phase 1: MVP Migration (Next.js First Routes)

**Purpose:** Create a working Next.js blog for NEW routes only (e.g., `/posts/*`).

1. Create new project with `create-next-app` (in `nextjs-app/` directory).
2. Place `chiranoura-blog` (content repo) locally and implement logic to read it as a filesystem (`fs`, `path`).
3. Create basic page (`app/posts/[slug]/page.tsx`) to convert Markdown/MDX to HTML and display.
4. Implement Next.js equivalents of Gatsby components (images, links).
5. Verify that `npm run build` (SSG output) succeeds.
6. **Deploy only to Next.js S3 bucket** - Gatsby unchanged

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

### Phase 0 Start (Progressive Setup)

```text
@docs/PROJECT_DESIGN.md Please read the document.
We're doing a PROGRESSIVE migration, not a rewrite.
Let's start with Phase 0: Progressive Setup.

Create a plan for:
1. Setting up a new Next.js project in a separate directory (nextjs-app/)
2. Configuring AWS with two S3 buckets (Gatsby existing + Next.js new)
3. CloudFront multi-origin setup with path-based routing
4. Dual GitHub Actions workflows for independent deployments

The goal is to run both Gatsby and Next.js side-by-side with zero disruption.
```

### Phase 1 Start (First Next.js Routes)

```text
@docs/PROJECT_DESIGN.md
Phase 0 infrastructure is ready. Let's proceed with Phase 1: MVP Migration.

Create a Next.js (App Router, TypeScript) project in the nextjs-app/ directory.
Implement ONLY the /posts/* routes initially - Gatsby handles everything else.
Read Markdown files from chiranoura-blog and display article pages.
Use Tailwind CSS for styling.

Remember: This deploys to the Next.js S3 bucket only. Gatsby stays unchanged.
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

### Content Management

* Content repository (`chiranoura-blog`) is separate and should not be modified during this migration
* Both Gatsby and Next.js read from the same content source
* Focus on maintaining existing functionality while adding new features incrementally
* All changes should be backward compatible with existing content

### Technical Considerations

* Performance and SEO should be prioritized throughout migration
* Monitor CloudFront metrics to compare Gatsby vs Next.js performance
* Test each new Next.js route thoroughly before adding to CloudFront routing
* Keep Gatsby build working until Next.js fully replaces all routes
