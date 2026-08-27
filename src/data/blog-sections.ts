export type BlogSectionKey = 'all' | 'tech' | 'news';

export interface BlogSection {
  key: BlogSectionKey;
  href: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
}

export const blogSections: BlogSection[] = [
  {
    key: 'all',
    href: '/blog',
    titleZh: '全部文章',
    titleEn: 'All Posts',
    descriptionZh: '讯飞开源技术文章、工程实践、项目发布与社区动态。',
    descriptionEn: 'iFLYTEK Open Source engineering notes, project releases, and community updates.',
  },
  {
    key: 'tech',
    href: '/category/tech',
    titleZh: '技术博客',
    titleEn: 'Tech Blog',
    descriptionZh: '深度技术文章、架构设计与工程实践，探索 AI、NLP、开发者工具等前沿技术。',
    descriptionEn:
      'In-depth technical articles, architecture design, and engineering practices across AI, NLP, and developer tools.',
  },
  {
    key: 'news',
    href: '/category/news',
    titleZh: '最新新闻',
    titleEn: 'Latest News',
    descriptionZh: '项目发布、版本更新、社区活动等科大讯飞开源生态最新资讯。',
    descriptionEn:
      'Project releases, version updates, community events, and the latest iFLYTEK open-source ecosystem news.',
  },
];

export const getBlogSection = (key?: string): BlogSection | undefined =>
  blogSections.find((section) => section.key === key || section.href === key);
