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
        { text: 'Discord', href: '#' },
      ],
    },
    {
      title: '相关网站',
      titleEn: 'Related Sites',
      links: [
        { text: 'iFLYTEK 官网', textEn: 'iFLYTEK Official', href: 'https://www.iflytek.com' },
        { text: 'GitHub', href: 'https://github.com/iflytek' },
        { text: 'Gitee', href: 'https://gitee.com/iflytekopensource' },
        { text: 'OSCHINA', href: 'https://www.oschina.net/' },
      ],
    },
    {
      title: '关注我们',
      titleEn: 'Follow Us',
      links: [
        { text: 'X (Twitter)', href: '#' },
        { text: 'YouTube', href: '#' },
        { text: '微信', textEn: 'WeChat', href: '#' },
        { text: 'Discord', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '隐私政策', textEn: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: '使用条款', textEn: 'Terms of Use', href: getPermalink('/terms') },
    { text: '开源许可', textEn: 'Open Source License', href: getPermalink('/license') },
  ],
  socialLinks: [
    { ariaLabel: 'X (Twitter)', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'WeChat', icon: 'tabler:brand-wechat', href: '#' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/iflytek' },
  ],
  footNote: `
    © 2024 iFLYTEK CO., LTD. All rights reserved.
  `,
};
