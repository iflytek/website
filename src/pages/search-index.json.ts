/**
 * Build-time search index generator.
 * Prerendered to /search-index.json during `astro build`.
 */
import { getCollection } from 'astro:content';
import { events } from '~/data/events';

export const prerender = true;

export async function GET() {
  const [posts, projects, adopters] = await Promise.all([
    getCollection('post'),
    getCollection('project'),
    getCollection('adopter'),
  ]);

  type IndexEntry = {
    id: string;
    type: 'blog' | 'project' | 'adopter' | 'event' | 'page';
    title: string;
    titleEn?: string;
    url: string;
    excerpt?: string;
    excerptEn?: string;
    category?: string;
    tags?: string[];
  };

  const index: IndexEntry[] = [];

  // Blog posts
  for (const post of posts) {
    if (post.data.draft) continue;
    index.push({
      id: post.id,
      type: 'blog',
      title: post.data.title,
      url: `/blog/${post.id.replace('.md', '').replace('.mdx', '')}`,
      excerpt: post.data.excerpt || '',
      category: post.data.category || '',
      tags: post.data.tags || [],
    });
  }

  // Projects
  for (const project of projects) {
    index.push({
      id: project.id,
      type: 'project',
      title: project.data.name,
      titleEn: project.data.nameEn,
      url: `/projects/${project.id.replace('.yaml', '').replace('.yml', '')}`,
      excerpt: project.data.description,
      excerptEn: project.data.descriptionEn,
      category: project.data.category,
      tags: project.data.tags || [],
    });
  }

  // Adopters
  for (const adopter of adopters) {
    index.push({
      id: adopter.id,
      type: 'adopter',
      title: adopter.data.name,
      titleEn: adopter.data.nameEn,
      url: `/adopters#adopter-${adopter.id}`,
      excerpt: adopter.data.subtitle,
      excerptEn: adopter.data.subtitleEn,
      tags: adopter.data.tags || [],
    });
  }

  // Events
  for (const event of events) {
    index.push({
      id: event.title,
      type: 'event',
      title: event.titleZh,
      titleEn: event.title,
      url: event.link || '/events',
      excerpt: event.description,
      tags: [event.type],
    });
  }

  // Static pages
  const pages = [
    { id: 'home', title: '首页', titleEn: 'Home', url: '/' },
    { id: 'projects', title: '项目', titleEn: 'Projects', url: '/projects' },
    { id: 'landscape', title: '全景图', titleEn: 'Landscape', url: '/landscape' },
    { id: 'events', title: '社区活动', titleEn: 'Events', url: '/events' },
    { id: 'blog', title: '博客', titleEn: 'Blog', url: '/blog' },
    { id: 'contribute', title: '贡献', titleEn: 'Contribute', url: '/contribute' },
    { id: 'adopters', title: '用户案例', titleEn: 'Adopters', url: '/adopters' },
    { id: 'security', title: '安全策略', titleEn: 'Security Policy', url: '/security' },
    { id: 'values', title: '社区价值观', titleEn: 'Community Values', url: '/values' },
    { id: 'cla', title: '贡献者许可协议', titleEn: 'Contributor License Agreement', url: '/cla' },
  ];

  for (const page of pages) {
    index.push({
      id: page.id,
      type: 'page',
      title: page.title,
      titleEn: page.titleEn,
      url: page.url,
    });
  }

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
