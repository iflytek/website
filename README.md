# iFLYTEK Open Source Website

The official open source website for iFLYTEK (科大讯飞), showcasing our open source projects, blog, events, and community contributions.

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
- ⚡ **Fast Performance** — Static site generation with Astro

## 📁 Project Structure

```
website/
├── src/
│   ├── components/    # UI components
│   ├── data/          # Content (blog posts, etc.)
│   ├── i18n/          # Internationalization
│   ├── layouts/       # Page layouts
│   ├── navigation.ts  # Navigation config
│   ├── config.yaml    # Site config
│   ├── pages/         # Route pages
│   └── utils/         # Utilities
├── public/            # Static assets
├── scripts/           # Build scripts
└── .github/           # CI/CD workflows
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 22.12.0
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

| Script                       | Description                         |
| ---------------------------- | ----------------------------------- |
| `npm run dev`                | Start development server            |
| `npm run build`              | Build for production                |
| `npm run preview`            | Preview production build            |
| `npm run check`              | Run all code quality checks         |
| `npm run check:astro`        | Run Astro type checking             |
| `npm run check:eslint`       | Run ESLint                          |
| `npm run check:prettier`     | Run Prettier check                  |
| `npm run fix`                | Auto-fix ESLint and Prettier issues |
| `npm run fetch:contributors` | Fetch GitHub contributor data       |
| `npm run license:check`      | Check dependency licenses           |
| `npm run license:report`     | Generate license report             |

## 🌍 Pages

| Route         | Description                           |
| ------------- | ------------------------------------- |
| `/`           | Homepage                              |
| `/projects`   | Project list with filters             |
| `/landscape`  | CNCF-style project landscape          |
| `/blog`       | Blog list (tech + news)               |
| `/events`     | Community events timeline             |
| `/contribute` | Contribution guide + contributor wall |

## 🤝 Contributing

Please read our [Contributing Guide](https://github.com/iflytek/community/blob/main/CONTRIBUTING.md) and [Code of Conduct](https://github.com/iflytek/community/blob/main/CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

Third-party licenses are listed in [NOTICE](NOTICE).

## 🔗 Links

- **Website**: https://opensource.iflytek.com
- **GitHub**: https://github.com/iflytek
- **iFLYTEK Official**: https://www.iflytek.com
