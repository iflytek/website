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
    title:
      'AI-Native Architecture Evolution and Governance: Building a Production-Grade Agent Infrastructure with Gateway, Sandbox, and Heterogeneous Scheduling',
    titleZh: 'AI 原生架构的演进与治理：基于网关、沙箱与异构调度构建生产级智能体底座',
    subtitle: 'AICon 北京 2026 · 专题「AI 原生架构的演进与治理」',
    subtitleEn: 'AICon Beijing 2026 · Track "AI-Native Architecture Evolution and Governance"',
    date: '2026-12-18',
    type: 'conference',
    description:
      '随着自主智能体从原型 Demo 走向企业规模化落地，传统云原生服务架构无法适配 Agent 自主循环、链式工具调用、动态代码执行等行为特征，AI 原生架构范式应运而生。本次分享基于控制面与数据面分离的核心理念，介绍一套由 AgentGateway、Agent Sandbox、Volcano、HAMi 和 Prometheus 共同组成的生产级智能体底座：AgentGateway 作为控制面负责身份鉴权、工具策略管控、流量路由与操作审计；Agent Sandbox 作为数据面提供与会话绑定的强隔离执行环境；依托 Volcano Gang 调度与 HAMi 异构算力分片解决大规模 Agent 并发场景下的 GPU 争抢与资源配额管控问题；并基于 Prometheus 构建覆盖网关策略、沙箱熔断、调度状态、显存利用率、会话 SLO 的全链路可观测闭环。演讲嘉宾：董江，科大讯飞资深架构师。',
    descriptionEn:
      'As autonomous agents move from prototype demos to enterprise-scale production, traditional cloud-native service architectures cannot accommodate agent autonomy loops, chained tool calls, and dynamic code execution — giving rise to the AI-native architecture paradigm. Based on the core principle of control-plane/data-plane separation, this talk presents a production-grade agent infrastructure composed of AgentGateway, Agent Sandbox, Volcano, HAMi, and Prometheus: AgentGateway serves as the control plane for identity authentication, tool policy enforcement, traffic routing, and operation auditing; Agent Sandbox provides the data plane with session-bound, strongly isolated execution environments; Volcano gang scheduling and HAMi heterogeneous compute slicing address GPU contention and quota management under massive agent concurrency; and Prometheus delivers a full-link observability loop covering gateway policies, sandbox circuit-breaking, scheduling state, VRAM utilization, and session SLOs. Speaker: Dong Jiang, Senior Architect at iFLYTEK.',
    location: 'Beijing, China',
    link: 'https://aicon.infoq.cn/2026/beijing/presentation/7474',
  },
  {
    title:
      'From Observability to Autonomous Decisions: AIOps Architecture Practice with Prometheus and Multi-Agent Collaboration',
    titleZh: '从可观测到自主决策：基于 Prometheus 与多 Agent 协同的 AIOps 架构实践',
    subtitle: '第 30 届 GOPS 全球运维大会·上海站',
    subtitleEn: 'The 30th GOPS Global Operations Conference · Shanghai',
    date: '2026-10-16',
    type: 'conference',
    description:
      '探讨如何基于 Prometheus 可观测性数据，结合多 Agent 协同架构，构建从监控洞察到自主决策的 AIOps 闭环系统。分享在大规模分布式环境下的实践经验，包括指标采集、智能告警、根因分析与自动化运维等核心能力的落地方案。',
    descriptionEn:
      'Exploring how to build an AIOps closed-loop system from monitoring insights to autonomous decisions, leveraging Prometheus observability data combined with multi-agent collaborative architecture. Sharing practical experiences in large-scale distributed environments, including core capabilities such as metrics collection, intelligent alerting, root cause analysis, and automated operations.',
    location: 'Shanghai, China',
    link: 'https://www3.bagevent.com/event/9149220',
  },
  {
    title: 'Spark LLM: Technical Innovation Practice with Domestic Computing Power',
    titleZh: '星火大模型：国产算力下技术自主创新实践',
    subtitle: 'AICC 2026 人工智能计算大会',
    subtitleEn: 'AICC 2026 AI Computing Conference',
    date: '2026-09-21',
    type: 'conference',
    description:
      '本次演讲围绕讯飞星火大模型在国产算力下的实践展开：从背景介绍出发，展示星火大模型的能力表现，深入探讨国产算力面临的技术挑战与突破路径，介绍端侧模型的开源进展，分享行业落地案例，并展望规划与生态共建的未来方向。',
    descriptionEn:
      "This talk covers iFLYTEK Spark large model practices on domestic computing: starting with background, showcasing Spark's capabilities, exploring technical challenges and breakthroughs in domestic computing, introducing edge-side model open-source efforts, sharing industry deployment cases, and outlining future plans and ecosystem collaboration.",
    location: 'Beijing, China',
    link: 'https://www.aicconf.net/',
  },
  {
    title: 'Focus on Efficiency, Not Compute',
    titleZh: '不卷算力，卷效率',
    subtitle: '基于 Volcano + HAMi-core 打造 K8s 异构 AI 加速算力底座',
    subtitleEn: 'Building a Heterogeneous AI Acceleration Infrastructure on Kubernetes with Volcano + HAMi-core',
    date: '2026-09-06',
    type: 'meetup',
    description:
      '聚焦 Kubernetes 上的异构 AI 算力调度与虚拟化：介绍 Volcano 批任务调度器如何承接大规模 AI 训练 / 推理作业，HAMi-core（异构计算中间层）如何对 GPU / NPU / 各类加速卡进行统一抽象与切分（MIG / vGPU / 共享显存），并分享讯飞在 Astron Agent 等平台上的落地经验——如何让多种异构 AI 加速设备在一个 K8s 集群中以统一接口被调度、配额、监控，显著降低 AI 算力成本。',
    descriptionEn:
      'A deep dive into heterogeneous AI compute scheduling on Kubernetes: how the Volcano batch scheduler handles large-scale AI training and inference workloads, how HAMi-core (the Heterogeneous AI Computing Middleware) unifies GPU / NPU / other accelerators through abstraction and slicing (MIG / vGPU / shared VRAM), and how iFLYTEK deploys this stack on platforms like Astron Agent — letting heterogeneous AI devices be scheduled, quota-managed and monitored under a single K8s interface, materially cutting AI compute costs.',
    location: 'Shanghai, China',
    link: 'https://mp.weixin.qq.com/s/JQWwoF_pwsdv7Do-EUBt_g',
  },
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
    type: 'conference',
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
