# Development Workflow

This document outlines the standard development workflow for the chirashi-js project when working with Claude Code.

## Overview

Follow this workflow for all feature development, bug fixes, and improvements:

1. Create GitHub Issue
2. Create Feature Branch
3. Implement Changes
4. Commit Periodically
5. Push and Create PR
6. Merge and Clean Up

---

## 1. Create GitHub Issue

**Purpose:** Track work, provide context, and enable auto-linking with PRs.

```bash
gh issue create --title "{Description}" --label "{label}" --body "..."
```

**Best Practices:**
- Use clear, descriptive titles
- Include summary, requirements, and benefits
- Add appropriate labels: `enhancement`, `bug`, etc.
- Create checklist for multi-step tasks

**Example:**
```bash
gh issue create --title "Migrate from Sass to PostCSS" --label "enhancement"
```

---

## 2. Branch Naming Convention

**Format:** `feature/issue-{NUMBER}_{brief-description}`

**Examples:**
- `feature/issue-875_yarn-to-npm-volta-to-proto`
- `feature/issue-877_migrate-sass-to-postcss`
- `feature/issue-879_document-workflow-for-claude`

**Commands:**
```bash
# Always start from master
git checkout master
git pull origin master

# Create new branch
git checkout -b feature/issue-{NUMBER}_{description}
```

---

## 3. Commit Message Convention

**Format:**
```
#{ISSUE_NUMBER} {Short description}

- Bullet point of change 1
- Bullet point of change 2
- Bullet point of change 3

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Best Practices:**
- Start with `#{ISSUE_NUMBER}` (e.g., `#877`)
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 72 characters
- Include detailed bullet points in body
- **Commit periodically** - don't wait until the end
- Always include Claude Code attribution

**Example:**
```bash
git commit -m "#877 Install PostCSS and configure plugins

- Install gatsby-plugin-postcss, postcss-preset-env, postcss-nesting
- Create postcss.config.js with modern CSS features
- Configure nesting, custom properties, and custom media queries

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 4. Implementation & Periodic Commits

**Key Principle:** Commit early and often

**Workflow:**
1. Make logical changes
2. Commit when you complete a coherent step
3. Don't batch multiple unrelated changes
4. Each commit should be a working state

**Example Sequence:**
```bash
# Step 1: Install dependencies
npm install --save-dev {packages}
git add package.json package-lock.json
git commit -m "#877 Install PostCSS and configure plugins..."

# Step 2: Configure
# ... create config files ...
git add postcss.config.js
git commit -m "#877 Create PostCSS configuration..."

# Step 3: Migrate files
# ... migrate files ...
git add src/
git commit -m "#877 Migrate SCSS files to CSS..."

# Step 4: Clean up
npm uninstall {old-packages}
git add package.json package-lock.json
git commit -m "#877 Remove Sass dependencies..."
```

---

## 5. Pull Request Process

**Step 1: Push Branch**
```bash
git push origin feature/issue-{NUMBER}_{description}
```

**Step 2: Create PR**
```bash
gh pr create --title "#{NUMBER} {Description}" --body "..." --base master
```

**PR Title Format:** `#{ISSUE_NUMBER} {Description}`

**PR Body Template:**
```markdown
## Summary
{Brief overview of changes}

## Changes
### {Category 1}
- ✅ Change 1
- ✅ Change 2

### {Category 2}
- ✅ Change 3

## Test Results
- ✅ All tests passing (X/X)
- ✅ Build verified successful
- ✅ {Other validations}

## Files Changed
- X files changed: +XXX insertions, -XXX deletions

## Commits
1. #{NUMBER} {First commit summary}
2. #{NUMBER} {Second commit summary}
...

## Benefits
- **Benefit 1:** Description
- **Benefit 2:** Description

Closes #{ISSUE_NUMBER}

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

**Important:**
- Include `Closes #{ISSUE_NUMBER}` to auto-close issue on merge
- Always use `--base master`
- Review the PR URL that's returned

---

## 6. After Merge

**Clean up local branches:**
```bash
# Switch back to master
git checkout master

# Pull latest changes
git pull origin master

# Delete local feature branch
git branch -d feature/issue-{NUMBER}_{description}
```

**Verify:**
- Issue is automatically closed
- Changes are in master
- All CI checks pass

---

## Quick Reference

```bash
# 1. Create issue
gh issue create --title "..." --label "enhancement"

# 2. Create branch from master
git checkout master && git pull
git checkout -b feature/issue-{N}_{desc}

# 3. Implement & commit periodically
# ... make changes ...
git add {files}
git commit -m "#{N} {Description}

- Change 1
- Change 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 4. Push and create PR
git push origin feature/issue-{N}_{desc}
gh pr create --title "#{N} {Desc}" --body "..." --base master

# 5. After merge
git checkout master && git pull
git branch -d feature/issue-{N}_{desc}
```

---

## Examples from Project History

### Example 1: Issue #875 (Yarn to npm, Volta to Proto)
- **Branch:** `feature/issue-875_yarn-to-npm-volta-to-proto`
- **Commits:** 4 commits, each with `#875` prefix
- **PR:** #876 with `Closes #875`
- **Result:** Auto-closed issue on merge

### Example 2: Issue #877 (Sass to PostCSS)
- **Branch:** `feature/issue-877_migrate-sass-to-postcss`
- **Commits:** 4 periodic commits
  1. Install PostCSS
  2. Update Gatsby config
  3. Migrate files
  4. Remove old dependencies
- **PR:** #878 with `Closes #877`

---

## Tips for Claude Code

- Always check recent commits to follow existing patterns: `git log --oneline -10`
- Use `gh issue view {NUMBER}` to check issue details
- Verify branch name before creating: `git branch --show-current`
- Test before committing: `npm test`, `npm run build`
- Keep commits atomic and focused
- Update issue checklist as you progress

---

## Accessing This Workflow

Use the `/workflow` slash command in Claude Code to view this documentation at any time.
