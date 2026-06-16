/**
 * Client-side i18n translation dictionary.
 *
 * Keys are referenced via `data-i18n="key"` on HTML elements.
 * The `applyLanguage()` function in BasicScripts looks up these keys
 * and swaps textContent when the language toggle is clicked.
 *
 * This file is imported at build time by BasicScripts.astro to embed
 * the dictionary into the inline script.
 */
export const translations: Record<string, { zh: string; en: string }> = {
  // Navigation
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.projects': { zh: '项目', en: 'Projects' },
  'nav.projectList': { zh: '项目列表', en: 'Project List' },
  'nav.landscape': { zh: '全景图', en: 'Landscape' },
  'nav.events': { zh: '活动', en: 'Events' },
  'nav.blog': { zh: '博客', en: 'Blog' },
  'nav.allPosts': { zh: '全部文章', en: 'All Posts' },
  'nav.techBlog': { zh: '技术博客', en: 'Tech Blog' },
  'nav.latestNews': { zh: '最新新闻', en: 'Latest News' },
  'nav.contribute': { zh: '贡献', en: 'Contribute' },

  // Footer
  'footer.quickLinks': { zh: '快速浏览', en: 'Quick Links' },
  'footer.contactUs': { zh: '联系我们', en: 'Contact Us' },
  'footer.relatedSites': { zh: '相关网站', en: 'Related Sites' },
  'footer.followUs': { zh: '关注我们', en: 'Follow Us' },
  'footer.securityPolicy': { zh: '安全策略', en: 'Security Policy' },
  'footer.communityValues': { zh: '社区价值观', en: 'Community Values' },
  'footer.cla': { zh: '开源许可', en: 'CLA' },

  // Homepage
  'home.subtitle': {
    zh: '探索科大讯飞的开源世界 — 涵盖 AI 大模型、自然语言处理、语音识别等前沿技术，共建智能未来。',
    en: "Explore iFLYTEK's open source world — covering AI large models, NLP, speech recognition and more, building the intelligent future together.",
  },
  'home.exploreBtn': { zh: '探索项目', en: 'Explore Projects' },
  'home.contributeBtn': { zh: '参与贡献', en: 'Contribute' },
  'home.statsTagline': { zh: '开源数据', en: 'Open Source Stats' },
  'home.statsTitle': { zh: '科大讯飞开源生态', en: 'iFLYTEK Open Source Ecosystem' },
  'home.statProjects': { zh: '开源项目', en: 'Projects' },
  'home.statLicense': { zh: '开源协议', en: 'License' },
  'home.featuresTagline': { zh: '探索', en: 'Explore' },
  'home.featuresTitle': { zh: '发现开源的力量', en: 'Discover the Power of Open Source' },
  'home.featuresSubtitle': {
    zh: '从 AI 大模型到开发者工具，科大讯飞开源生态覆盖多个技术领域',
    en: 'From AI large models to developer tools, iFLYTEK open source ecosystem covers multiple tech domains',
  },
  'home.featProjectsTitle': { zh: '开源项目', en: 'Open Source Projects' },
  'home.featProjectsDesc': {
    zh: '涵盖 AI、NLP、语音识别、开发者工具等多个领域的开源项目，提供完整的文档和示例。',
    en: 'Open source projects covering AI, NLP, speech recognition, developer tools and more, with full documentation and examples.',
  },
  'home.featLandscapeTitle': { zh: '全景图', en: 'Landscape' },
  'home.featLandscapeDesc': {
    zh: 'CNCF 风格的开源生态全景图，一目了然地查看所有科大讯飞开源项目及分类。',
    en: 'CNCF-style ecosystem landscape showing all iFLYTEK open source projects and categories at a glance.',
  },
  'home.featBlogTitle': { zh: '技术博客', en: 'Tech Blog' },
  'home.featBlogDesc': {
    zh: '深入的技术文章、教程和架构分享，帮助你更好地理解和使用开源项目。',
    en: 'In-depth technical articles, tutorials and architecture sharing to help you better understand and use open source projects.',
  },
  'home.featEventsTitle': { zh: '社区活动', en: 'Community Events' },
  'home.featEventsDesc': {
    zh: 'Meetup、Hackathon、Conference 等丰富多彩的社区活动，与开发者面对面交流。',
    en: 'Meetups, Hackathons, Conferences and more — connect face-to-face with developers.',
  },
  'home.featContributeTitle': { zh: '参与贡献', en: 'Contribute' },
  'home.featContributeDesc': {
    zh: '无论你是新手还是资深开发者，都可以找到适合自己的贡献方式。',
    en: "Whether you're a beginner or a seasoned developer, there's a way for you to contribute.",
  },
  'home.featLicenseTitle': { zh: '开源许可', en: 'Open Source License' },
  'home.featLicenseDesc': {
    zh: '所有项目均采用宽松的开源协议，鼓励商业使用和技术创新。',
    en: 'All projects use permissive open source licenses, encouraging commercial use and innovation.',
  },
  'home.blogTitle': { zh: '技术博客与新闻', en: 'Tech Blog & News' },
  'home.ctaTitle': { zh: '加入科大讯飞开源社区', en: 'Join the iFLYTEK Open Source Community' },
  'home.ctaSubtitle': { zh: '与我们一起构建更好的 AI 开源生态', en: 'Build a better AI open source ecosystem with us' },
  'home.ctaGithub': { zh: '在 GitHub 上关注我们', en: 'Follow us on GitHub' },
  'home.ctaDiscord': { zh: '加入 Discord', en: 'Join Discord' },

  // Projects
  'projects.titleZh': { zh: '开源项目', en: 'Projects' },
  'projects.subtitle': {
    zh: '探索科大讯飞的开源项目生态，涵盖 AI Agent、开发工具等前沿领域',
    en: "Explore iFLYTEK's open source project ecosystem, covering AI Agent, developer tools and more",
  },
  'projects.statProjects': { zh: '开源项目', en: 'Projects' },
  'projects.statStars': { zh: 'GitHub Stars', en: 'GitHub Stars' },
  'projects.statForks': { zh: 'Forks', en: 'Forks' },
  'projects.allBtn': { zh: '全部', en: 'All' },
  'projects.allLangBtn': { zh: '全部语言', en: 'All Languages' },
  'projects.viewLandscape': { zh: '查看全景图', en: 'View Landscape' },

  // Category
  'category.techTitle': { zh: '技术博客', en: 'Tech Blog' },
  'category.techDesc': {
    zh: '深度技术文章、架构设计与工程实践，探索 AI、NLP、开发者工具等前沿技术',
    en: 'In-depth technical articles, architecture design and engineering practices exploring AI, NLP, developer tools and more',
  },
  'category.newsTitle': { zh: '最新新闻', en: 'Latest News' },
  'category.newsDesc': {
    zh: '项目发布、版本更新、社区活动等科大讯飞开源生态最新资讯',
    en: 'Latest news on project releases, version updates, community events and the iFLYTEK open source ecosystem',
  },

  // Contribute
  'contribute.titleZh': { zh: '参与贡献', en: 'Contribute' },
  'contribute.subtitle': {
    zh: '无论你是新手还是资深开发者，科大讯飞开源社区都欢迎你',
    en: "Whether you're a beginner or a seasoned developer, the iFLYTEK open source community welcomes you",
  },
  'contribute.statContributors': { zh: '贡献者', en: 'Contributors' },
  'contribute.statTotalContributions': { zh: '总贡献', en: 'Total Contributions' },
  'contribute.contributorsWall': { zh: '贡献者墙', en: 'Contributors Wall' },
  'contribute.topContributors': { zh: '贡献者排行', en: 'Top Contributors' },
  'contribute.howTitle': { zh: '如何贡献', en: 'How to Contribute' },
  'contribute.issuesTitle': { zh: '新手任务', en: 'Good First Issues' },
  'contribute.issuesDesc': {
    zh: '从这些适合新手的 Issue 开始你的贡献之旅',
    en: 'Start your contribution journey with these beginner-friendly Issues',
  },
  'contribute.communityTitle': { zh: '社区链接', en: 'Community Links' },
  'contribute.communityDesc': {
    zh: '加入我们的社区，参与讨论和交流',
    en: 'Join our community for discussions and networking',
  },
  'contribute.prWorkflow': { zh: '贡献流程', en: 'PR Workflow' },
  'contribute.viewGuide': { zh: '查看贡献指南', en: 'View Contributing Guide' },
  'contribute.bugTitle': { zh: '报告 Bug', en: 'Report Bugs' },
  'contribute.bugDesc': {
    zh: '在 GitHub Issues 中提交 Bug 报告，帮助我们发现问题、改进质量',
    en: 'Submit bug reports on GitHub Issues to help us find and fix problems',
  },
  'contribute.ideaTitle': { zh: '提出建议', en: 'Suggest Ideas' },
  'contribute.ideaDesc': {
    zh: '分享你的想法和功能建议，参与项目方向讨论和 RFC',
    en: 'Share your ideas and feature suggestions, participate in project direction discussions',
  },
  'contribute.codeTitle': { zh: '提交代码', en: 'Submit Code' },
  'contribute.codeDesc': {
    zh: 'Fork 项目，提交 Pull Request，修复 Bug 或开发新功能',
    en: 'Fork the project, submit Pull Requests, fix bugs or develop new features',
  },
  'contribute.docsTitle': { zh: '完善文档', en: 'Improve Docs' },
  'contribute.docsDesc': {
    zh: '改进文档、编写教程、翻译内容，让更多人能顺利使用项目',
    en: 'Improve documentation, write tutorials, translate content to help more users',
  },
  'contribute.shareTitle': { zh: '传播分享', en: 'Share & Promote' },
  'contribute.shareDesc': {
    zh: 'Star 项目、写博客、在社区活动中分享你的使用经验',
    en: 'Star projects, write blog posts, share your experience at community events',
  },
  'contribute.buildTitle': { zh: '社区建设', en: 'Community Building' },
  'contribute.buildDesc': {
    zh: '参与讨论、帮助新用户、组织 Meetup，共同建设开源社区',
    en: 'Join discussions, help newcomers, organize Meetups, build the open source community together',
  },

  // Events
  'events.titleZh': { zh: '社区活动', en: 'Community Events' },
  'events.subtitle': {
    zh: '参与科大讯飞开源社区活动 — Meetup、Hackathon、Workshop，与开发者面对面交流',
    en: 'Join iFLYTEK open source community events — Meetups, Hackathons, Workshops, connect face-to-face with developers',
  },
  'events.allBtn': { zh: '全部', en: 'All' },
  'events.upcoming': { zh: '即将举办', en: 'Upcoming' },
  'events.ongoing': { zh: '进行中', en: 'Ongoing' },
  'events.past': { zh: '已结束', en: 'Past' },
  'events.viewDetails': { zh: '详情', en: 'Details' },
  'events.latestNews': { zh: '最新动态', en: 'Latest News' },

  // Blog
  'blog.titleZh': { zh: '技术博客', en: 'Blog' },
  'blog.subtitle': {
    zh: '深入的技术文章、教程和架构分享，帮助你更好地理解和使用科大讯飞开源项目',
    en: 'In-depth technical articles, tutorials and architecture sharing to help you better understand iFLYTEK open source projects',
  },
  'blog.prevPost': { zh: '上一篇', en: 'Previous Post' },
  'blog.nextPost': { zh: '下一篇', en: 'Next Post' },
  'blog.relatedPosts': { zh: '相关文章', en: 'Related Posts' },
  'blog.minRead': { zh: '分钟阅读', en: 'min read' },
  'blog.viewAllPosts': { zh: '查看所有文章', en: 'View All Posts' },
  'blog.newerPosts': { zh: '更新的文章', en: 'Newer posts' },
  'blog.olderPosts': { zh: '更早的文章', en: 'Older posts' },

  // Landscape
  'landscape.titleZh': { zh: '开源全景图', en: 'Open Source Landscape' },
  'landscape.subtitle': {
    zh: '科大讯飞开源项目生态全景',
    en: 'iFLYTEK open source project ecosystem overview',
  },
  'landscape.projects': { zh: '个项目', en: 'projects' },
  'landscape.comingSoon': { zh: '即将开放', en: 'Coming Soon' },
  'landscape.about': { zh: '关于全景图', en: 'About Landscape' },
  'landscape.aboutText': {
    zh: '全景图以分类视图展示科大讯飞所有开源项目，数据基于 GitHub 仓库实时更新。灵感来源于',
    en: 'The landscape shows all iFLYTEK open source projects by category, with data updated in real-time from GitHub. Inspired by',
  },
  'landscape.aboutText2': {
    zh: '。 项目数据每周自动通过 GitHub Actions 更新。',
    en: '. Project data is automatically updated weekly via GitHub Actions.',
  },
  'landscape.zoomIn': { zh: '放大', en: 'Zoom In' },
  'landscape.zoomOut': { zh: '缩小', en: 'Zoom Out' },
  'landscape.reset': { zh: '重置', en: 'Reset' },

  // Project Detail
  'projectDetail.back': { zh: '返回项目列表', en: 'Back to Projects' },
  'projectDetail.projects': { zh: '项目', en: 'Projects' },
  'projectDetail.viewSource': { zh: '查看源码', en: 'View Source' },
  'projectDetail.visitHomepage': { zh: '访问官网', en: 'Visit Website' },

  // Static pages
  'security.titleZh': { zh: '安全策略', en: 'Security Policy' },
  'values.titleZh': { zh: '社区价值观', en: 'Community Values' },
  'cla.titleZh': { zh: '开源许可', en: 'Contributor License Agreement' },

  // Adopters
  'adopters.titleZh': { zh: '用户案例', en: 'Adopters' },
  'adopters.subtitle': {
    zh: '探索 Astron 开源生态的用户案例，了解各行业如何利用 AI Agent 平台实现业务创新',
    en: 'Explore Astron open source ecosystem user cases, see how industries leverage AI Agent platform for business innovation',
  },

  // Footer
  'footer.wechatTitle': { zh: '微信扫码加入社区', en: 'Scan QR to join WeChat group' },
  'footer.wechatDesc': {
    zh: 'Scan the QR code to join our WeChat group',
    en: 'Scan the QR code to join our WeChat group',
  },
};
