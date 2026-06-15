# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Language Filter on Projects Page**: Add language filter bar (Java, Python, TypeScript, JavaScript) with AND logic alongside category filter; project cards carry `data-languages` attribute for client-side filtering
- **Real-time Project Stats**: `getProjectsWithStats()` utility fetches live stars/forks from GitHub API at runtime (Vercel SSR), falls back to `.cache/project-stats.json` at build time
- **Project Stats Script**: `scripts/fetch-project-stats.ts` fetches stars/forks for all project repos via GitHub API, saves to `.cache/project-stats.json`
- **Project Stats CI**: `.github/workflows/update-project-stats.yml` — daily GitHub Action at 2:00 AM Beijing time to refresh cached stats
- **Vercel SSR Pages**: `/projects`, `/projects/[slug]`, `/contribute` marked `export const prerender = false` for real-time data via Vercel serverless functions (Astro 6.x static mode supports per-page SSR)
- **In-memory Cache**: 5-minute TTL memory cache in `getProjectsWithStats()` and `fetchContributorsLive()` to reduce API calls on warm serverless invocations
- **Favicon**: Replace favicon and logo icon with iFLYTEK GitHub avatar (`avatars.githubusercontent.com/u/26786495`)
- **Contributors**: Fetch 164 real contributors from GitHub API (56 original repos, 8 forks excluded) replacing placeholder data
- **Projects**: Add 3 new categories — RPA & Automation, AI Skills, Tutorials
- **Projects**: Show project count `(N)` on category filter buttons, matching Events page style
- **Contribute**: Make "How to Contribute" cards clickable with links to `iflytek/community` (Issues, Contributing Guide, Code of Conduct)
- **Contribute**: Add "Good First Issues" and "Community Links" sections with Discord, GitHub links
- **Blog**: Add gradient header (技术博客 / Blog) matching Events page style for `/blog`, `/category/tech`, `/category/news`
- **Home**: Add card containers with hover animation to 6 feature sections (上移、阴影、边框高亮、标题变色、图标放大)
- **Copyright**: Use dynamic year `${new Date().getFullYear()}` instead of hardcoded 2026

### Changed

- **Blog Watermark Architecture**: Watermark images now pre-baked to `public/images/watermarked/` via `scripts/watermark-images.ts`; originals in `src/assets/images/` remain untouched; `<Image watermark>` resolves watermarked copies via `findWatermarkedImage()`
- **Blog Detail Page**: Move featured image below article body; hide title/excerpt in header (`sr-only` for SEO); reduce prose font size to `prose-sm lg:prose-lg`
- **Navigation**: Rename "新闻" to "最新新闻" in nav menu; update category page title accordingly
- **Project Detail Page**: Replace `getStaticPaths` + `Astro.props` with dynamic `Astro.params.slug` lookup + `getProjectsWithStats()` for real-time stats on each request
- **Contributors Fetching**: `contribute.astro` now calls GitHub API directly at runtime (via native `fetch`) when `GITHUB_TOKEN` is set, falls back to `.cache/contributors.json` otherwise
- **Fork Filtering**: `fetch-contributors.ts` now excludes fork repos (`repo.fork`) and archived repos (`repo.archived`) to prevent upstream contributors from appearing on the wall
- **Gradient Colors**: Introduce semantic tokens `--color-gradient-start` / `--color-gradient-end` (referencing primary-600/accent-500) in `tailwind.css`, replacing hardcoded `from-blue-600 to-purple-600` across all pages
- **Hover Styles**: Unify card hover effects across all pages — `hover:shadow-lg`, `hover:-translate-y-0.5`, `dark:hover:border-primary-800` — including dark mode
- **Community Files Post-processing**: `scripts/fetch-community-files.ts` now runs `postProcessFiles()` in `finally` block on every build, auto-fixing `blob/main` → `blob/master` links and relative URL conversion even when git clone fails
- **Logo**: Replace 🚀 emoji with iFLYTEK avatar image in site header
- **Tailwind**: Define complete primary (50–950) and accent (50–950) color scales in `@theme` — fixes transparent text/icons caused by missing numbered variants in Tailwind v4
- **Projects**: Remove Featured badge, sort projects by stars only
- **Projects**: Wrap ProjectCard in `<div class="project-card">` to fix category filter selecting filter buttons
- **Events**: Add dark mode hover effects (`dark:hover:border-primary-800`) to event cards and news cards
- **Contribute**: Fix all community links — `blob/main` → `blob/master`, `CODE_OF_CONDUCT.md` → `code-of-conduct.md` (lowercase)
- **Contributors Canvas**: Fix rendering failure caused by `DOMContentLoaded` not firing during Astro View Transitions — use `document.readyState` check + `requestAnimationFrame(boot)`
- **Contributors Canvas**: Enlarge "iFLYTEK" text and avatar size in canvas
- **Events Filter**: Fix filter script with `is:inline` + `readyState` pattern for View Transitions compatibility
- **Prettier**: Add `.cache`, `contributing.md`, `security.md` to `.prettierignore`

### Removed

- Unused images: `app-store.png`, `google-play.png`, `hero-image.png`

### Fixed

- **Blog Navigation**: Fix double `/blog/blog/` prefix in prev/next post links
- **Dependabot #1, #2 (esbuild)**: Force `esbuild >= 0.28.1` via `package.json` overrides — fixes vulnerability in transitive dependency from `@astrojs/vercel` (0.27.7) and `tsx` (0.28.0)
- **Dependabot #3 (path-to-regexp)**: Force `path-to-regexp >= 6.3.0` via `package.json` overrides — fixes vulnerability in transitive dependency from `@vercel/routing-utils` (6.1.0)
- **Tailwind v4**: `from-primary-500`, `to-accent-500` and other numbered color variants rendered as transparent — fixed by defining full color scales
- **View Transitions**: Category filter buttons on `/projects` and type filter on `/events` did not work during client-side navigation — fixed with `is:inline` script and `readyState` check
- **Community Links**: 404 errors from wrong branch name (`main` vs `master`) and wrong filename case (`CODE_OF_CONDUCT.md` vs `code-of-conduct.md`)
- **Project Card**: `data-category` attribute forwarded to component conflicted with filter `querySelectorAll('[data-category]')` — fixed by wrapping in explicit `<div class="project-card">`
- **ESLint/Prettier scanning `.vercel/`**: Build output directory was being scanned by linter/formatter — fixed by adding `.vercel` and `.cache` to ignore lists

## [0.1.0] - 2025-06-12

### Added

- Vercel Web Analytics integration
- `contributing.md` and `security.md` referencing `iflytek/community` repository
- Code of Conduct file (`code-of-conduct.md`)

### Changed

- Bump `actions/checkout` from 4 to 6
- Bump `actions/setup-node` from 4 to 6
- Bump `actions/upload-artifact` from 4 to 7
- Bump `actions/download-artifact` from 4 to 8
- Bump `amondnet/vercel-action` from 25 to 42
- Bump Astro and `@astrojs/*` dependencies
- Bump 10 dev dependencies (prettier, eslint, typescript, etc.)
- Expand allowed licenses list and update NOTICE for all dependencies
- Add OFL-1.1 license for Inter font

### Fixed

- TypeScript errors and formatting issues across 16 files
- Remove unused error variable in catch block
- Conflicting license-checker flags in CI

## [0.0.1] - 2024-06-11

### Added

- Initial release of iFLYTEK Open Source Website
- Based on Astro 6.x + Tailwind CSS v4 + AstroWind theme
- **Pages**: Home, Projects, Landscape, Blog, Events, Contribute
- **Projects**: Astron Agent (8.5K stars) & SkillHub (3.4K stars)
- **Blog**: 5 posts (2 tech + 2 news + 1 welcome)
- **Events**: 9 community events from Astron Agent
- **Contribute**: Canvas avatar animation forming "iFLYTEK" text
- **Features**: Dark/Light/System theme, responsive design, SEO optimized
- **CI/CD**: GitHub Actions for PR check, deploy, security scan
- **Dependabot**: Automated dependency updates
