/**
 * Shared events data — used by events.astro page and the search index.
 */

export interface Event {
  title: string;
  titleZh: string;
  subtitle?: string;
  subtitleEn?: string;
  date: string;
  type: 'conference' | 'meetup' | 'hackathon' | 'workshop' | 'webinar';
  status?: 'upcoming' | 'ongoing' | 'past';
  description: string;
  descriptionEn: string;
  location: string;
  link?: string;
}

export const events: Event[] = [
  {
    title: 'How One Person Can Sustainably Maintain an Enterprise-Grade Open-Source Agent Project',
    titleZh: '一个人，如何持续维护一个企业级 Agent 开源项目',
    subtitle: '从 Astron Agent 的工程复杂度，到 Loop Engineering 的自驱动闭环',
    subtitleEn: "From Astron Agent's Engineering Complexity to a Self-Driving Loop with Loop Engineering",
    date: '2026-09-04',
    type: 'conference',
    description:
      '如何通过 Loop Engineering，将 AI Coding 引入真实研发流程，自动化解决需求拆解、代码开发、测试验证、CI 检测、部署上线等环节中的效率与质量问题，形成从需求到交付的自动化闭环。通过这一实践，Astron Agent 项目的研发流程正在从传统人工驱动，逐步演进为 AI 原生、自动化、可验证的工程体系，为复杂 AI 应用平台的持续迭代和规模化交付提供了新的实践路径。',
    descriptionEn:
      "Learn how Loop Engineering brings AI Coding into real-world development workflows to automate requirements decomposition, code development, test validation, CI checks, and deployment, improving efficiency and quality while creating an automated loop from requirements to delivery. Through this practice, Astron Agent's development process is evolving from traditional human-driven workflows into an AI-native, automated, and verifiable engineering system, offering a new path for the continuous iteration and scalable delivery of complex AI application platforms.",
    location: 'IBP International Conference Center, Shanghai, China',
    link: 'https://a2m.msup.com.cn/course/19413?aid=4949&qd=dahui&city=shanghai&_a2m_nocache=1787040965742',
  },
  {
    title: 'Driving Real Hardware with Astron Agent',
    titleZh: '用 Astron Agent 驱动真实硬件',
    date: '2026-07-31',
    type: 'hackathon',
    description:
      '带大家探索如何用 Agent 连接用户意图与真实设备，完成从产品想法到可演示硬件 Demo 的完整闭环。结合 Tuya T5 硬件场景，演示读取传感器数据、条件判断与屏幕提示等实体动作，手边没有开发板也可通过 Mock API 验证工作流。',
    descriptionEn:
      'Explore how to connect user intent with real devices using Astron Agent — from product idea to a working hardware demo. Featuring a Tuya T5 walkthrough: reading sensor data, conditional logic, and driving screen prompts. No dev board? Verify the workflow first with Mock API, then switch to real hardware.',
    location: 'Online',
    link: 'https://mp.weixin.qq.com/s/cO_c12PBRisePxSMQLuiIA',
  },
  {
    title: '2nd AI Innovation Exchange Conference · Tianjin',
    titleZh: '智汇津城·破界新生——第 2 届人工智能创新发展交流会',
    date: '2026-07-11',
    type: 'meetup',
    description: '技术分享：企业级 Agentic AI 智能体应用架构与知识工程实践',
    descriptionEn: 'Tech sharing: enterprise Agentic AI agent architecture and knowledge engineering practices',
    location: 'Tianjin, China',
    link: 'https://mp.weixin.qq.com/s/N7qphWxzAMByttJ9OcxWBQ',
  },
  {
    title: 'AI Agent Industry Practice @ AtomGit & Ascend Meetup · Shanghai',
    titleZh: '智驱迭代·昇腾赋能——AI Agent 行业实践',
    date: '2026-06-27',
    type: 'meetup',
    description: '技术分享：基于 Astron-Agent 的智能代理架构与知识工程实践',
    descriptionEn:
      'Tech sharing: Astron-Agent based intelligent agent architecture and knowledge engineering practices',
    location: 'Shanghai, China',
    link: 'https://mp.weixin.qq.com/s/ZgygUsKPZQGeL8cB1x2D_g',
  },
  {
    title: 'Astron Hackathon @ 2025 iFLYTEK Global 1024 Developer Festival',
    titleZh: 'Astron 黑客松 @ 2025 讯飞全球 1024 开发者节',
    date: '2025-10-24',
    type: 'hackathon',
    description: '年度 AI 开发者盛会，基于 Astron Agent 平台的创新挑战赛',
    descriptionEn: 'Annual AI developer festival — innovation challenge based on the Astron Agent platform',
    location: 'Hefei, China',
    link: 'https://luma.com/9zmbc6xb',
  },
  {
    title: 'Astron Agent Zhengzhou Meetup',
    titleZh: 'Astron Agent 郑州 Meetup',
    date: '2025-09-20',
    type: 'meetup',
    description: '社区线下交流，分享 Astron Agent 最佳实践与企业落地案例',
    descriptionEn: 'Community meetup sharing Astron Agent best practices and enterprise adoption stories',
    location: 'Zhengzhou, China',
    link: 'https://github.com/iflytek/astron-agent/discussions/672',
  },
  {
    title: 'Astron on Campus @ Zhejiang University of Finance and Economics',
    titleZh: 'Astron 进校园 @ 浙江财经大学',
    date: '2025-06-15',
    type: 'workshop',
    description: '走进校园，为高校学子介绍 AI Agent 开发技术与开源生态',
    descriptionEn: 'Campus outreach introducing AI Agent development and open-source ecosystem to university students',
    location: 'Hangzhou, China',
    link: 'https://mp.weixin.qq.com/s/oim_Z0ckgpFwf5jOskoJuA',
  },
  {
    title: 'Astron Agent & RPA · Qingdao Meetup',
    titleZh: 'Astron Agent & RPA · 青岛 Meetup',
    date: '2025-05-18',
    type: 'meetup',
    description: '聚焦 Agentic AI 与 RPA 的融合，探讨企业自动化新范式',
    descriptionEn: 'Focusing on the convergence of Agentic AI and RPA — exploring new enterprise automation paradigms',
    location: 'Qingdao, China',
    link: 'https://github.com/iflytek/astron-agent/discussions/740',
  },
  {
    title: 'Astron Training Camp · Cohort #1',
    titleZh: 'Astron 训练营 · 第 1 期',
    date: '2025-04-10',
    type: 'workshop',
    description: '系统化的 Astron Agent 开发培训，从入门到实战',
    descriptionEn: 'Structured Astron Agent developer training — from onboarding to hands-on practice',
    location: 'Online',
    link: 'https://www.aidaxue.com/astronCamp',
  },
  {
    title: 'Astron Talk @ Chongqing Mini Tech Fest',
    titleZh: 'Astron 分享 @ 重庆 Mini Tech Fest',
    date: '2025-03-22',
    type: 'meetup',
    description: '技术分享：AI Agent 在企业中的落地实践',
    descriptionEn: 'Tech sharing: AI Agent deployment practices in enterprise environments',
    location: 'Chongqing, China',
  },
  {
    title: 'Astron Agent @ MWC Barcelona 2026',
    titleZh: 'Astron Agent 亮相 MWC Barcelona 2026',
    date: '2026-02-25',
    type: 'conference',
    description: '在世界移动通信大会上展示企业级 AI Agent 工作流平台',
    descriptionEn: 'Showcasing enterprise AI Agent workflow platform at Mobile World Congress Barcelona',
    location: 'Barcelona, Spain',
    link: 'https://www.iflytek.com/en/news-events/mwc2026.html',
  },
  {
    title: 'Astron Agent & RPA · Hefei Meetup',
    titleZh: 'Astron Agent & RPA · 合肥 Meetup',
    date: '2026-03-15',
    type: 'meetup',
    description: '社区线下交流，聚焦 RPA 与 Agent 的深度集成',
    descriptionEn: 'Community meetup focusing on deep integration of RPA and Agent',
    location: 'Hefei, China',
  },
  {
    title: 'Astron Industrial Intelligence Hackathon',
    titleZh: 'Astron 工业智能黑客松',
    date: '2026-05-20',
    type: 'hackathon',
    description: '面向工业场景的 AI Agent 创新挑战赛',
    descriptionEn: 'AI Agent innovation challenge for industrial scenarios',
    location: 'Online + Hefei',
    link: 'https://awesome-astron-workflow.dev/activities/astron-industrial-intelligence-hackathon',
  },
];
