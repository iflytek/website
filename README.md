# iFLYTEK Open Source Website

The official open source website for iFLYTEK (科大讯飞), showcasing our open source projects, blog, events, and community contributions.

<p align="center">
  <br>
  <a href="https://github.com/iflytek/website/actions/workflows/deploy.yml"><img alt="Deploy Production" src="https://github.com/iflytek/website/actions/workflows/deploy.yml/badge.svg"></a>
  <a href="https://discord.com/invite/vXzgts4fK" target="_blank"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/iflytek/website" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white" alt="GitHub"></a>
  <a href="https://github.com/iflytek/community/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/LICENSE-4CAF50?logo=creativecommons&logoColor=white" alt="LICENSE"></a>
</p>

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) 6.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Content**: MDX (Markdown + JSX)
- **Language**: TypeScript
- **Theme**: Based on [AstroWind](https://github.com/arthelokyo/astrowind)

## ✨ Features

- 🌓 **Dark/Light/System Mode** — Three theme modes with smooth transitions
- 🌐 **i18n Support** — Chinese and English bilingual support
- 📱 **Responsive Design** — Mobile, Tablet, and Desktop optimized
- 📝 **Blog System** — Tech blog and news with MDX support
- 🗺️ **Project Landscape** — CNCF-style interactive project map
- 👥 **Contributor Wall** — GitHub contributor avatars animation
- 🔍 **SEO Optimized** — Meta tags, Open Graph, Sitemap
- ⚡ **Fast Performance** — Hybrid rendering (SSG + SSR) with Astro

## 📁 Project Structure

```
website/
├── src/
│   ├── components/    # UI components
│   ├── data/          # Content (blog posts, project data)
│   ├── layouts/       # Page layouts
│   ├── navigation.ts  # Navigation config
│   ├── config.yaml    # Site config
│   ├── pages/         # Route pages
│   └── utils/         # Utilities
├── public/            # Static assets
├── scripts/           # Build scripts (fetch contributors, project stats, community files)
├── vendor/            # AstroWind integration
├── .cache/            # Build-time data cache (contributors, project stats)
└── .github/           # CI/CD workflows + Dependabot
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 24.x
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321`

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 📋 Available Scripts

| Script                        | Description                           |
| ----------------------------- | ------------------------------------- |
| `npm run dev`                 | Start development server              |
| `npm run build`               | Build for production (with prebuild)  |
| `npm run preview`             | Preview production build              |
| `npm run check`               | Run all code quality checks           |
| `npm run check:astro`         | Run Astro type checking               |
| `npm run check:eslint`        | Run ESLint                            |
| `npm run check:prettier`      | Run Prettier check                    |
| `npm run fix`                 | Auto-fix ESLint and Prettier issues   |
| `npm run fetch:contributors`  | Fetch GitHub contributor data         |
| `npm run fetch:project-stats` | Fetch GitHub stars/forks for projects |
| `npm run license:check`       | Check dependency licenses             |
| `npm run license:report`      | Generate license report (Markdown)    |
| `npm run license:summary`     | Show license summary                  |

## 🌍 Pages

| Route             | Description                                     |
| ----------------- | ----------------------------------------------- |
| `/`               | Homepage                                        |
| `/projects`       | Project list with category and language filters |
| `/projects/:slug` | Individual project detail page                  |
| `/landscape`      | CNCF-style project landscape                    |
| `/blog`           | Blog list (tech + news)                         |
| `/events`         | Community events timeline                       |
| `/contribute`     | Contribution guide + contributor wall           |
| `/adopters`       | Customer case studies (10 enterprise stories)   |
| `/security`       | Security policy                                 |
| `/values`         | Community values                                |
| `/cla`            | Contributor License Agreement                   |

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

Third-party licenses are listed in [NOTICE](NOTICE).

## 🔗 Links

- **Website**: https://opensource.iflytek.com
- **GitHub**: https://github.com/iflytek
- **Gitee**: https://gitee.com/organizations/iflytek
- **iFLYTEK Official**: https://www.iflytek.com
- **Discord**: https://discord.com/invite/vXzgts4fK
- **LinkedIn**: https://www.linkedin.com/in/astron-ai
