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

## 3. Implementation Roadmap (Step-by-Step)

AI assistants should be given instructions for each phase and proceed to the next only after completion confirmation.

### Phase 1: MVP Migration (Gatsby to Next.js)

**Purpose:** Create a "simple Next.js blog" that displays existing articles.

1. Create new project with `create-next-app`.
2. Place `chiranoura-blog` (content repo) locally and implement logic to read it as a filesystem (`fs`, `path`).
3. Create basic page (`app/[slug]/page.tsx`) to convert Markdown/MDX to HTML and display.
4. Replace Gatsby-era components (images and links).
5. Verify that `npm run build` (SSG output) succeeds.

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

## 4. Data Structure Definitions

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

## 5. AI Assistant Prompt Examples

Use the following commands with Claude Code or Gemini when starting each phase.

### Phase 1 Start

```text
@Project_Design_Document Please read the document.
First, let's proceed with Phase 1: MVP Migration.
Create a new Next.js (App Router, TypeScript) project and
provide minimal implementation code that reads local Markdown files
and displays article pages.
Use Tailwind CSS for styling.
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

## 6. Development Workflow

For detailed development workflow (branching, commits, PRs), see:
* `.claude/commands/workflow.md`

Key points:
* Create issues before starting work
* Branch naming: `feature/issue-{NUMBER}_{description}`
* Commit format: `#{NUMBER} Description`
* PR description must include `Closes #{NUMBER}` for auto-closing issues

---

## Notes

* Content repository (`chiranoura-blog`) is separate and should not be modified during this migration
* Focus on maintaining existing functionality while adding new features incrementally
* All changes should be backward compatible with existing content
* Performance and SEO should be prioritized throughout migration
