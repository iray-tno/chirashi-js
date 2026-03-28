# NPM Scripts Reference

This document provides a comprehensive guide to all npm scripts available in the chirashi-js monorepo.

## Table of Contents

- [Root Scripts](#root-scripts)
- [Blog App Scripts](#blog-app-scripts)
- [Components Package Scripts](#components-package-scripts)
- [Content Package Scripts](#content-package-scripts)
- [Common Workflows](#common-workflows)
- [Tips and Best Practices](#tips-and-best-practices)

---

## Root Scripts

Run these commands from the **project root** (`/chirashi-js`).

### Development

```bash
# Start the blog in development mode (Next.js)
npm run dev

# Start legacy Gatsby development server (deprecated)
npm run dev:legacy
```

### Build

```bash
# Build the blog for production (Next.js)
npm run build

# Build legacy Gatsby site (deprecated)
npm run build:legacy

# Serve built legacy site locally
npm run serve:legacy
```

### Testing

```bash
# Run tests across all workspaces
npm test

# Run tests in watch mode (interactive)
npm run test:watch

# Run tests with UI dashboard
npm run test:ui
```

### Linting

```bash
# Run linting across all workspaces
npm run lint
```

### Storybook

```bash
# Start Storybook for component development (components package)
npm run storybook
```

### Quality Checks

```bash
# Run both lint and test across all workspaces
npm run check

# Run all checks for components (lint, test, type-check)
npm run check:components
```

### Maintenance

```bash
# Clean all node_modules and lock files
npm run clean

# Clean and reinstall all dependencies
npm run fresh-install
```

### Build All

```bash
# Build components and blog in order
npm run build:all
```

---

## Blog App Scripts

Run these commands from the **blog workspace** using one of these methods:

```bash
# Method 1: From root with workspace flag
npm run <script> --workspace=blog

# Method 2: Navigate to apps/blog
cd apps/blog && npm run <script>
```

### Available Scripts

```bash
# Start Next.js development server
npm run dev --workspace=blog

# Build for production
npm run build --workspace=blog

# Start production server
npm run start --workspace=blog

# Lint code
npm run lint --workspace=blog
```

### Common Usage

```bash
# Development
npm run dev --workspace=blog
# Opens at http://localhost:3000

# Production build and start
npm run build --workspace=blog
npm run start --workspace=blog
```

---

## Components Package Scripts

The `@chirashi/components` package contains shared React components.

Run from root:
```bash
npm run <script> --workspace=@chirashi/components
```

Or navigate to the package:
```bash
cd packages/components && npm run <script>
```

### Build & Development

```bash
# Build components (ESM + CJS)
npm run build --workspace=@chirashi/components

# Build in watch mode (rebuilds on changes)
npm run dev --workspace=@chirashi/components
```

### Testing

```bash
# Run tests once
npm run test --workspace=@chirashi/components

# Run tests with UI dashboard
npm run test:ui --workspace=@chirashi/components

# Generate coverage report
npm run test:coverage --workspace=@chirashi/components
```

### Type Checking

```bash
# Type check without emitting files
npm run type-check --workspace=@chirashi/components
```

### Linting & Formatting (Biome)

```bash
# Lint code
npm run lint --workspace=@chirashi/components

# Lint and auto-fix
npm run lint:fix --workspace=@chirashi/components

# Format code
npm run format --workspace=@chirashi/components

# Check formatting
npm run format:check --workspace=@chirashi/components

# Run both lint and format checks
npm run check --workspace=@chirashi/components

# Run both lint and format with auto-fix
npm run check:fix --workspace=@chirashi/components
```

### Storybook

```bash
# Start Storybook dev server
npm run storybook --workspace=@chirashi/components
# Opens at http://localhost:6006

# Build static Storybook
npm run build-storybook --workspace=@chirashi/components
```

---

## Content Package Scripts

The `@chirashi/content` package holds MDX blog posts.

```bash
# Validate content (placeholder - Phase 2)
npm run validate --workspace=@chirashi/content

# Validate frontmatter (placeholder - Phase 2)
npm run validate-frontmatter --workspace=@chirashi/content
```

---

## Common Workflows

### Starting Development

**Option 1: Blog Only**
```bash
npm run dev
```

**Option 2: Blog + Storybook**
```bash
# Terminal 1: Start blog
npm run dev

# Terminal 2: Start Storybook
npm run storybook
```

**Option 3: Component Development**
```bash
# Terminal 1: Build components in watch mode
npm run dev --workspace=@chirashi/components

# Terminal 2: Start Storybook
npm run storybook --workspace=@chirashi/components

# Terminal 3: Run tests in watch mode (optional)
npm run test:watch --workspace=@chirashi/components
```

### Building for Production

```bash
# Build everything (from root)
npm run build

# Or build specific workspaces
npm run build --workspace=blog
npm run build --workspace=@chirashi/components
```

### Running Tests

```bash
# Run all tests across workspaces
npm test

# Run tests for specific workspace
npm test --workspace=@chirashi/components

# Interactive test watching
npm run test:watch

# Test with coverage
npm run test:coverage --workspace=@chirashi/components
```

### Code Quality Checks

```bash
# Lint all workspaces
npm run lint

# Lint and fix components
npm run check:fix --workspace=@chirashi/components

# Type check components
npm run type-check --workspace=@chirashi/components
```

### Working with Components

```bash
# 1. Start Storybook to visually develop components
npm run storybook --workspace=@chirashi/components

# 2. Run tests in watch mode in another terminal
npm run test --workspace=@chirashi/components -- --watch

# 3. Build when ready
npm run build --workspace=@chirashi/components

# 4. Check format and lint
npm run check --workspace=@chirashi/components
```

### Pre-Commit Checks

Before committing, run these checks:

```bash
# Option 1: Run all checks (recommended)
npm run check

# Option 2: Run component checks specifically
npm run check:components

# Option 3: Manual checks
npm run lint
npm test
npm run type-check --workspace=@chirashi/components
```

### Troubleshooting & Maintenance

```bash
# If dependencies are broken
npm run fresh-install

# If you just want to clean
npm run clean

# Then reinstall
npm install --legacy-peer-deps
```

---

## Tips and Best Practices

### Workspace Commands

**Always prefer workspace flags from root:**
```bash
# ✅ Good - explicit and clear
npm run test --workspace=@chirashi/components

# ❌ Avoid - requires directory navigation
cd packages/components && npm run test
```

### Running Multiple Workspaces

```bash
# Run script in all workspaces that have it
npm run test --workspaces --if-present

# Run in specific workspaces
npm run build --workspace=blog --workspace=@chirashi/components
```

### Development Server Ports

| Service | Port | URL |
|---------|------|-----|
| Blog (Next.js) | 3000 | http://localhost:3000 |
| Components Storybook | 6006 | http://localhost:6006 |
| Vitest UI | 51204 | http://localhost:51204/__vitest__/ |

### Common Flags

```bash
# Vitest flags
npm test -- --run           # Run once (no watch)
npm test -- --watch          # Watch mode
npm test -- --coverage       # With coverage
npm test -- --ui            # UI mode

# Biome flags
npm run lint -- --write      # Auto-fix
npm run format -- --write    # Format files
```

### Package Dependencies

The blog app depends on both packages:
```json
{
  "@chirashi/components": "*",
  "@chirashi/content": "*"
}
```

**Build order matters:**
1. Build `@chirashi/components` first (if changed)
2. Then build `blog`

```bash
npm run build --workspace=@chirashi/components
npm run build --workspace=blog
```

### Troubleshooting

**Components not updating in blog?**
```bash
# Rebuild components
npm run build --workspace=@chirashi/components

# Restart blog dev server
npm run dev --workspace=blog
```

**Tests failing after dependency changes?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Storybook not finding components?**
```bash
# Check Storybook is running from correct location
npm run storybook --workspace=@chirashi/components
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start blog dev | `npm run dev` |
| Build blog | `npm run build` |
| Build everything | `npm run build:all` |
| Run all tests | `npm test` |
| Run all checks | `npm run check` |
| Start Storybook | `npm run storybook` |
| Component dev | `npm run dev --workspace=@chirashi/components` |
| Component tests | `npm test --workspace=@chirashi/components` |
| Component checks | `npm run check:components` |
| Lint components | `npm run check:fix --workspace=@chirashi/components` |
| Type check | `npm run type-check --workspace=@chirashi/components` |
| Test coverage | `npm run test:coverage --workspace=@chirashi/components` |
| Clean all | `npm run clean` |
| Fresh install | `npm run fresh-install` |

---

## See Also

- [Development Workflow](./WORKFLOW.md) - Git workflow and PR process
- [Project Design](./PROJECT_DESIGN.md) - Architecture overview
- [Monorepo Migration](./MONOREPO_MIGRATION.md) - Migration guide
- [Features](./FEATURES.md) - Feature specifications
