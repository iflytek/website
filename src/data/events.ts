/**
 * Shared events data — used by events.astro page and the search index.
 */

export interface Event {
  title: string;
  titleZh: string;
  date: string;
  type: 'conference' | 'meetup' | 'hackathon' | 'workshop' | 'webinar';
  status?: 'upcoming' | 'ongoing' | 'past';
  description: string;
  location: string;
  link?: string;
}

export const events: Event[] = [
  {
    title: '2nd AI Innovation Exchange Conference · Tianjin',
    titleZh: '智汇津城·破界新生——第 2 届人工智能创新发展交流会',
    date: '2026-07-11',
    type: 'meetup',
    description: '技术分享：企业级 Agentic AI 智能体应用架构与知识工程实践',
    location: 'Tianjin, China',
    link: 'https://mp.weixin.qq.com/s/N7qphWxzAMByttJ9OcxWBQ',
  },
  {
    title: 'AI Agent Industry Practice @ AtomGit & Ascend Meetup · Shanghai',
    titleZh: '智驱迭代·昇腾赋能——AI Agent 行业实践',
    date: '2026-06-27',
    type: 'meetup',
    description: '技术分享：基于 Astron-Agent 的智能代理架构与知识工程实践',
    location: 'Shanghai, China',
    link: 'https://mp.weixin.qq.com/s/ZgygUsKPZQGeL8cB1x2D_g',
  },
  {
    title: 'Astron Hackathon @ 2025 iFLYTEK Global 1024 Developer Festival',
    titleZh: 'Astron 黑客松 @ 2025 讯飞全球 1024 开发者节',
    date: '2025-10-24',
    type: 'hackathon',
    description: '年度 AI 开发者盛会，基于 Astron Agent 平台的创新挑战赛',
    location: 'Hefei, China',
    link: 'https://luma.com/9zmbc6xb',
  },
  {
    title: 'Astron Agent Zhengzhou Meetup',
    titleZh: 'Astron Agent 郑州 Meetup',
    date: '2025-09-20',
    type: 'meetup',
    description: '社区线下交流，分享 Astron Agent 最佳实践与企业落地案例',
    location: 'Zhengzhou, China',
    link: 'https://github.com/iflytek/astron-agent/discussions/672',
  },
  {
    title: 'Astron on Campus @ Zhejiang University of Finance and Economics',
    titleZh: 'Astron 进校园 @ 浙江财经大学',
    date: '2025-06-15',
    type: 'workshop',
    description: '走进校园，为高校学子介绍 AI Agent 开发技术与开源生态',
    location: 'Hangzhou, China',
    link: 'https://mp.weixin.qq.com/s/oim_Z0ckgpFwf5jOskoJuA',
  },
  {
    title: 'Astron Agent & RPA · Qingdao Meetup',
    titleZh: 'Astron Agent & RPA · 青岛 Meetup',
    date: '2025-05-18',
    type: 'meetup',
    description: '聚焦 Agentic AI 与 RPA 的融合，探讨企业自动化新范式',
    location: 'Qingdao, China',
    link: 'https://github.com/iflytek/astron-agent/discussions/740',
  },
  {
    title: 'Astron Training Camp · Cohort #1',
    titleZh: 'Astron 训练营 · 第 1 期',
    date: '2025-04-10',
    type: 'workshop',
    description: '系统化的 Astron Agent 开发培训，从入门到实战',
    location: 'Online',
    link: 'https://www.aidaxue.com/astronCamp',
  },
  {
    title: 'Astron Talk @ Chongqing Mini Tech Fest',
    titleZh: 'Astron 分享 @ 重庆 Mini Tech Fest',
    date: '2025-03-22',
    type: 'meetup',
    description: '技术分享：AI Agent 在企业中的落地实践',
    location: 'Chongqing, China',
  },
  {
    title: 'Astron Agent @ MWC Barcelona 2026',
    titleZh: 'Astron Agent 亮相 MWC Barcelona 2026',
    date: '2026-02-25',
    type: 'conference',
    description: '在世界移动通信大会上展示企业级 AI Agent 工作流平台',
    location: 'Barcelona, Spain',
    link: 'https://www.iflytek.com/en/news-events/mwc2026.html',
  },
  {
    title: 'Astron Agent & RPA · Hefei Meetup',
    titleZh: 'Astron Agent & RPA · 合肥 Meetup',
    date: '2026-03-15',
    type: 'meetup',
    description: '社区线下交流，聚焦 RPA 与 Agent 的深度集成',
    location: 'Hefei, China',
  },
  {
    title: 'Astron Industrial Intelligence Hackathon',
    titleZh: 'Astron 工业智能黑客松',
    date: '2026-05-20',
    type: 'hackathon',
    description: '面向工业场景的 AI Agent 创新挑战赛',
    location: 'Online + Hefei',
    link: 'https://awesome-astron-workflow.dev/activities/astron-industrial-intelligence-hackathon',
  },
];
