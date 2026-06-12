import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '首页',
      textEn: 'Home',
      href: getPermalink('/'),
    },
    {
      text: '项目',
      textEn: 'Projects',
      links: [
        {
          text: '项目列表',
          textEn: 'Project List',
          href: getPermalink('/projects'),
        },
        {
          text: '全景图',
          textEn: 'Landscape',
          href: getPermalink('/landscape'),
        },
      ],
    },
    {
      text: '活动',
      textEn: 'Events',
      href: getPermalink('/events'),
    },
    {
      text: '博客',
      textEn: 'Blog',
      links: [
        {
          text: '全部文章',
          textEn: 'All Posts',
          href: getBlogPermalink(),
        },
        {
          text: '技术博客',
          textEn: 'Tech Blog',
          href: getPermalink('/category/tech'),
        },
        {
          text: '新闻',
          textEn: 'News',
          href: getPermalink('/category/news'),
        },
      ],
    },
    {
      text: '贡献',
      textEn: 'Contribute',
      href: getPermalink('/contribute'),
    },
  ],
  actions: [
    {
      text: 'GitHub',
      href: 'https://github.com/iflytek',
      target: '_blank',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: '快速浏览',
      titleEn: 'Quick Links',
      links: [
        { text: '首页', textEn: 'Home', href: getPermalink('/') },
        { text: '项目', textEn: 'Projects', href: getPermalink('/projects') },
        { text: '博客', textEn: 'Blog', href: getBlogPermalink() },
        { text: '活动', textEn: 'Events', href: getPermalink('/events') },
        { text: '贡献', textEn: 'Contribute', href: getPermalink('/contribute') },
      ],
    },
    {
      title: '联系我们',
      titleEn: 'Contact Us',
      links: [
        { text: 'Email', href: 'mailto:opensource@iflytek.com' },
        { text: 'GitHub', href: 'https://github.com/iflytek' },
        { text: 'Discord', href: 'https://discord.com/invite/vXzgts4fK' },
      ],
    },
    {
      title: '相关网站',
      titleEn: 'Related Sites',
      links: [
        { text: 'iFLYTEK Official', href: 'https://www.iflytek.com' },
        { text: 'GitHub', href: 'https://github.com/iflytek' },
        { text: 'Gitee', href: 'https://gitee.com/organizations/iflytek' },
      ],
    },
    {
      title: '关注我们',
      titleEn: 'Follow Us',
      links: [
        { text: 'LinkedIn', href: 'https://www.linkedin.com/in/astron-ai' },
        { text: 'WeChat', href: '#' },
        { text: 'Discord', href: 'https://discord.com/invite/vXzgts4fK' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '安全策略', textEn: 'Security Policy', href: getPermalink('/security') },
    { text: '社区价值观', textEn: 'Community Values', href: getPermalink('/values') },
    { text: '开源许可', textEn: 'CLA', href: getPermalink('/cla') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/astron-ai' },
    { ariaLabel: 'WeChat', icon: 'tabler:brand-wechat', href: '#' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.com/invite/vXzgts4fK' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/iflytek' },
  ],
  footNote: `
    © ${new Date().getFullYear()} iFLYTEK Corporation All Rights Reserved by iFLYTEK
  `,
};
