# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Hugging Face Icon Asset**: Download official Hugging Face SVG logo to `src/assets/images/hugging-face.svg`; replace inline placeholder SVGs in `ProjectCard.astro` and `[slug].astro` with `<img src={hfIcon.src}>`

## [0.3.0] - 2026-07-03

### Added

- **Mobile Drawer Navigation**: Replace hamburger-expanded nav with slide-in drawer panel (`#mobile-drawer`) — tree-structured navigation with always-expanded 2-level hierarchy (section labels + child links with connector dots and trunk lines), close button, backdrop overlay with blur, ESC/backdrop/link-click to dismiss, auto-close on resize to desktop, View Transitions compatible via `astro:after-swap`. Theme toggle (`ToggleTheme`) and language toggle (`ToggleLanguage`) moved into drawer footer for mobile, hidden on desktop via `hidden md:flex` wrappers
- **Search Modal (`SearchModal.astro`)**: Global `Ctrl+K` / `⌘K` search with Fuse.js fuzzy matching across blog posts, projects, adopters, events, and static pages — lazy-loaded `/search-index.json`, results grouped by type with `<mark>` match highlighting, keyboard navigation (↑↓/Enter/Esc), bilingual support (zh/en), dark mode. `SearchButton.astro` in header triggers modal; `search-index.json.ts` endpoint aggregates all content collections at build time
- **Adopter Modal (`AdopterModal.astro`)**: Layout-level adopter detail modal — macOS/iOS-style frosted glass, URL hash routing (`#adopter-{slug}`), retry mechanism (20 attempts × 50ms) for DOM readiness, `loadAdopterData()` re-reads embedded JSON on every open/swap for multi-cycle reliability
- **Project Detail Page Icons**: `[slug].astro` now renders project icon image (`data.icon`) when available, with first-letter gradient circle fallback for projects without icons
- **New Projects — MemFlywheel & Domux**: Add MemFlywheel (file-native memory flywheel for AI Agents, category `memory-system`) and Domux (low-latency smart-home command model based on Gemma-4-E2B-it, category `llm`) to `/projects` page, project detail pages, and stats cache
- **Project Card External Links**: ProjectCard component supports `links` field (HuggingFace, ModelScope) with brand SVG icons, styled same as GitHub button, positioned next to GitHub button in card footer
- **Project Detail External Links**: Project detail page `[slug].astro` renders external links (HuggingFace, ModelScope) with brand SVG icons in Action Buttons section
- **Landscape 4-Column Layout**: Expand landscape from 3 to 4 columns (30%+26%+22%+22%) — new Column 4 adds Memory System (MemFlywheel) and LLM (Domux) sections with violet/rose theming; all ecosystem arrows proportionally repositioned
- **Tech Blog Posts**: Add 2 new tech blog posts — "MemFlywheel：给 AI Agent 装上文件原生记忆飞轮" and "Domux：150ms 内的智能家居指令理解模型", with architecture/benchmark images from GitHub repos, watermarked via `scripts/watermark-images.ts`
- **Content Schema `links` Field**: Add `links: z.array(z.string()).optional()` to project collection schema in `content.config.ts`
- **Events Data (`events.ts`)**: Extract event data to shared `src/data/events.ts` for reuse across events page and search index

### Changed

- **Header Layout Redesign**: Desktop nav keeps horizontal links; mobile nav delegates to drawer. `ToggleTheme` and `ToggleLanguage` wrapped in `hidden md:flex` divs (fixes Tailwind v4 `inline-flex` overriding `hidden`). BasicScripts mobile menu handlers cleaned up — no longer toggles `h-screen`/`bg-page`/`overflow-hidden` on header
- **Adopter Modal Moved to Layout**: Modal HTML + JS moved from `adopters.astro` (page-level) to `AdopterModal.astro` (layout-level in `Layout.astro`) — fixes View Transitions issue where page-level `is:inline` script wouldn't re-execute after navigation
- **Landscape Mobile Scaling**: Replace CSS-only `transform: scale()` with JS `scaleLandscape()` that dynamically sets wrapper height (`naturalHeight × scale`) — fixes excess scroll space caused by CSS transform not affecting layout box. Listens to `resize` and `astro:after-swap`
- **Footer Hugging Face & ModelScope Links**: Add Hugging Face (`https://huggingface.co/iFlytekOpenSource`) and ModelScope (`https://modelscope.cn/organization/iflytek`) links to footer "Related Sites" column and social icon bar (inline SVG icons via `iconHtml` field)
- **Footer `iconHtml` Support**: Extend `Footer.astro` `Link` interface with `iconHtml` field to support custom inline SVG icons for brands not available in tabler icon set
- **Footer WeChat QR Modal**: Add WeChat QR code modal — clicking WeChat link in footer opens a modal with group QR code image; supports ESC key, backdrop click, and Astro View Transitions re-binding
- **Footer Bilingual Links**: Add `data-lang-zh`/`data-lang-en` to all footer text links and column titles for language switching
- **Events**: Add 2 new community events — "AI Agent Industry Practice @ AtomGit & Ascend Meetup · Shanghai" (2026-06-27) and "2nd AI Innovation Exchange Conference · Tianjin" (2026-07-11)
- **Auto Event Status**: Event status (`upcoming`/`ongoing`/`past`) auto-calculated by comparing `event.date` with current date, removing manual status maintenance
- **Projects Page Mobile Optimization**: Filter bar buttons responsive sizing (`text-xs`/`px-4` on mobile, `sm:text-sm` on sm+), category labels show only Chinese name on mobile via `i18n-zh`/`i18n-en` classes; card footer stacks vertically on mobile (`flex-col sm:flex-row`)
- **Card Height Consistency**: ProjectCard uses `h-full` on wrapper and `flex h-full flex-col` on card div for equal-height cards across rows
- **Project Stats Cache**: `.cache/project-stats.json` updated with 9 repos (MemFlywheel ⭐7, Domux ⭐6); `.cache/contributors.json` updated with 170 contributors from 60 repos
- **Footer Links Updated**: "联系我们" Discord link now uses real URL (`https://discord.com/invite/vXzgts4fK`); "相关网站" Gitee URL updated to org page, OSCHINA replaced with AtomGit; "关注我们" updated with real LinkedIn and Discord URLs, removed X/YouTube placeholders
- **Secondary Links**: Replaced Privacy/Terms/License with Security Policy, Community Values, and CLA
- **Header Actions**: Remove GitHub button from header action bar
- **README**: Add Hugging Face and ModelScope links to the Links section
- **Code Quality**: Add `is:inline` to AdopterModal JSON `<script>` tag (silences astro(4000) hint); remove deprecated `position="right"` from `LandingLayout.astro` Header — 0 errors, 0 warnings, 0 hints
- **Gitignore**: Add `TEST_REPORT.md` to temporary files section

### Fixed

- **Search View Transitions**: `const` DOM refs became stale after page swap — changed to `let` with `refreshRefs()` + `attachElementListeners()` called in `astro:after-swap`
- **Adopter Multi-Cycle Failure**: Modal broke after multiple open/close/navigation cycles — fixed by calling `loadAdopterData()` in every `openModal()`, `syncHash()`, and `astro:after-swap` handler
- **Adopter Direct URL Hash**: Navigating to `/adopters#adopter-xxx` didn't show card when DOM wasn't ready — fixed with retry mechanism (20 attempts × 50ms)
- **Same-Page Hash Navigation**: Search results linking to same page with hash (e.g. `/adopters#adopter-agentguard`) didn't trigger `hashchange` — fixed with `e.preventDefault()` + manual `window.location.hash` assignment
- **aria-hidden Accessibility Warning**: Focused element retained inside hidden modal — fixed by calling `document.body.focus()` and `focused.blur()` before hiding
- **"博客" Nav Link**: Added `href: getBlogPermalink()` to navigation config — was missing, causing the link to render as a non-navigable element
- **Window Resize Losing Header Elements**: BasicScripts resize handler was adding `hidden` class to `#header > div > div:last-child` (the entire right-side container including search box) — removed the offending line
- **Mobile Toggle Visibility**: Desktop `ToggleTheme`/`ToggleLanguage` visible in mobile menu due to Tailwind v4 class ordering (`inline-flex` overriding `hidden`) — fixed by wrapping in `hidden md:flex` divs

## [0.2.0] - 2026-06-17

### Added

- **i18n Language Toggle**: Client-side 中文/EN toggle button in header (`ToggleLanguage.astro`), persisted via `localStorage.lang`, effective across all pages without reload
- **i18n Attribute System**: `data-i18n="key"` attribute-based translation with central dictionary (`translations.ts`); `data-lang-zh`/`data-lang-en` for inline bilingual text switching
- **CSS Content Visibility**: `.i18n-zh`/`.i18n-en` CSS class system with `html.lang-en` class toggle for full-page bilingual content on static pages
- **Bilingual Static Pages**: Full Chinese/English content for `/security` (安全策略), `/values` (社区价值观), `/cla` (贡献者许可协议) using dual-div layout
- **i18n Coverage**: `data-i18n` attributes added to all pages — home, projects, project detail, contribute, events, landscape, blog, blog categories, pagination, post navigation, related posts
- **Project Icons**: Configure valid icon paths for 5 projects — Astron Agent, Astron RPA, AstronClaw Tutorial, HarnessClaw, SkillHub use local `/images/` icons. Projects without icons (iFly Skills, HarnessClaw Engine) fall back to first-letter display with gradient background
- **Adopters Page**: New `/adopters` page showcasing 10 enterprise customer stories from `iflytek/astron-agent` — Donghua Software, China Telecom Suzhou, Yunsuan Digital, Xiaoqu Tech, Shandong Yungu, Guangwu Interconnect, Beijing Yugou, FiberHome, Foxit Zhongshu, Xiangyang Dongsheng. Header matches events style (gradient + blurred circles), two-row marquee with opposite scroll directions (row 1 left, row 2 right), local logo images in `public/images/adopters/`. i18n-aware title (用户案例 / Adopters), bilingual descriptions
- **Project Card Icon Background**: Remove gradient background when project has a configured icon — only show gradient for first-letter fallback
- **New Projects**: Add HarnessClaw (Electron desktop app, agent-management) and HarnessClaw Engine (Go LLM engine, agent-engine) — total 7 projects
- **Landscape Rewrite**: Complete treemap rewrite matching awesome-astron-workflow.dev/landscape — 6 categories (agentic-workflow, agentic-automation, agent-skills, tutorial, agent-management, agent-engine), 3-column layout (42%/33%/25%), SVG ecosystem arrows, bilingual labels via `.i18n-zh`/`.i18n-en`
- **Landscape Download Fix**: "Save HD Image" button uses CDN-based `html-to-image` (`is:inline` script) — fixes bundling issue where page-level `<script>` was not processed by Vite; downloads 1280×cardHeight PNG at 3x pixel ratio
- **Landscape Scale Fix**: Remove height constraint from scale formula (`scale(min((100vw-40px)/1280, 1))`), card uses `min-h-[800px]` instead of fixed `h-[720px]` — prevents bottom clipping of Skill Registry and Tutorial cards
- **Landscape Background**: Page header matches /projects style (`from-primary-50` gradient with blurred circles); treemap section on white background
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
- **Blog i18n Link Fix**: `BlogHighlightedPosts.astro` and `BlogLatestPosts.astro` now use `set:html` for `linkText` to properly render `data-i18n` attributes (was rendering raw HTML tags as text). Homepage passes i18n-aware `linkText` to `BlogLatestPosts`
- **Stats Mobile Layout Fix**: Merged icon/amount and label into same container so labels stay aligned with their values on mobile; removed `min-w-[220px]` to keep 4 items in one row on desktop
- **Adopters Modal**: Click any adopter card to open a macOS/iOS-style frosted-glass detail modal with logo, full scenario, delivery and outcome sections. URL hash routing (`#adopter-{slug}`) for direct linking. Mobile bottom sheet, desktop centered. i18n-aware (zh/en), ESC/overlay close, language toggle sync
- **Adopters Tags i18n**: Add `tagsEn` field to all 10 adopter YAML files and content schema. Card tags use `data-lang-zh`/`data-lang-en` for language switching. Modal JS selects `tagsEn`/`tags` based on current language
- **Adopters Disclaimer**: Add `* 以上案例已获用户授权同意展示` / `* All cases shown have been authorized by the users` footer note below marquee sections, using `data-i18n` translation key
- **Contribute Cold-Start Optimization**: `contribute.astro` now reads `.cache/contributors.json` first (committed with build, served from Vercel filesystem) for instant render on cold start. Live GitHub API fetch runs in background to refresh cache. Previous logic (API → cache fallback) inverted to cache → API refresh

### Changed

- **Bilingual UI Cleanup**: Removed all `中文 / English` dual-display patterns (title "中文 / English" → single title that switches by language mode) across all pages — contribute, events, projects, landscape, blog, category, project detail
- **Landscape Subtitle**: Restructured with `.i18n-zh`/`.i18n-en` blocks for full sentence translation including dynamic counts (X 个项目 → X projects)
- **Category System**: Renamed from 7 categories to 6 matching awesome-astron-workflow.dev — `ai-platform`→`agentic-workflow`, `rpa-automation`→`agentic-automation`, `ai-skills`→`agent-skills`, `developer-tools`→`agent-skills`, `tutorials`→`tutorial`, added `agent-management`, `agent-engine`
- **Contribute Multi-Org**: `fetchContributorsLive()` now iterates over `CONTRIBUTE_ORGS = ['iflytek', 'harnessclaw']` via `Promise.all`, merging contributor data from both GitHub organizations
- **Homepage Background**: Hero section now has gradient background (`from-primary-50 to-white`) with blurred accent circles, matching /projects page header style — implemented as default fallback in `Hero.astro`'s `bg` slot (passing a `<Fragment slot="bg">` from parent breaks Astro's CSS module injection)
- **Homepage White Strip Fix**: Body background changed from white to `primary-50` (`rgb(235 242 255)`) in `CustomStyles.astro` — matches Hero gradient start color, eliminating white strip between browser top and navigation
- **Hero Title No-Wrap**: h1 uses `whitespace-nowrap` with responsive font sizing (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`) — keeps "iFLYTEK Open Source" / "科大讯飞开源" on one line across all screen sizes
- **Stats Layout**: Amounts row (7, 18.4K, 2.2K, Apache 2.0) and labels row (开源项目, GitHub Stars, Forks, 开源协议) now render as two separate flex rows in `Stats.astro` — amounts on top line, labels on bottom line
- **Contribute PR Workflow**: Step descriptions now bilingual (`descZh`/`descEn`) with `data-lang-zh`/`data-lang-en` switching
- **Brand Name i18n**: "iFLYTEK Open Source" displays as "科大讯飞开源" in Chinese mode across logo, header, homepage title, and all widget default texts via `data-lang-zh`/`data-lang-en`
- **Language Change Event**: `BasicScripts.astro` language toggle now dispatches `CustomEvent('languagechange')` so page-specific scripts (e.g. adopters modal) can react and re-render when language switches
- **Font Stack**: Add `'PingFang SC'` to `--font-sans` and `--font-heading` CSS font stacks (Apple device local font only, no `@font-face` or font file upload)
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
- **Landscape Card Clipping**: Remove fixed `h-[720px]` height, use `min-h-[800px]` instead — prevents bottom clipping of Skill Registry and Tutorial category cards
- **Landscape Download Button**: Page-level `<script>` is inline in Astro (not processed by Vite) — npm `import('html-to-image')` fails in browser. Fixed by using `<script is:inline>` with CDN ESM import (`cdn.jsdelivr.net/npm/html-to-image@1.11.11/+esm`)
- **Projects Filter Buttons**: `{sortedProjects.length}` inside HTML attribute quotes rendered as literal text — fixed by using backtick template literals in `data-lang-zh`/`data-lang-en` attributes
- **Prettier**: Add `.cache`, `contributing.md`, `security.md` to `.prettierignore`

### Removed

- Unused images: `app-store.png`, `google-play.png`, `hero-image.png`

### Fixed

- **Events Page**: Fixed swapped `data-lang-zh`/`data-lang-en` on event subtitle (zh was showing English and vice versa)
- **Stats Widget**: `{title}` → `set:html={title}` so `<span data-i18n>` renders as DOM instead of escaped text; removed `uppercase` class that distorted "Projects" → "PROJECTS"
- **Features Widget**: Same `set:html` fix for `itemTitle` to render `data-i18n` spans correctly
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
