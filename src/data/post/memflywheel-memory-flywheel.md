---
publishDate: 2026-07-01T00:00:00Z
title: 'MemFlywheel：让 Agent 把每一次执行，沉淀成下一次更懂你的开始'
excerpt: 'MemFlywheel 是面向 Agent Harness 的文件原生记忆与自学习闭环，通过执行前召回、执行后沉淀、learned skill 演化和 dream 整理，让现有开源 Agent 框架获得可治理的长期记忆层。'
image: '~/assets/images/memflywheel-overview.png'
category: 'tech'
tags: ['memflywheel', 'ai-agent', 'memory', 'open-source']
author: 'iFLYTEK Open Source Team'
---

# MemFlywheel：让 Agent 把每一次执行，沉淀成下一次更懂你的开始！

AI Agent 正在快速走向生产落地，但一个核心问题始终困扰着开发者：如何让 Agent 把每一次执行，沉淀成下一次更懂你的开始？

主流方案把记忆交给上下文窗口或外部向量数据库，前者受限于窗口大小，后者平添部署复杂度与检索延迟，且都只解决了“记住”，没有解决“学会”。科大讯飞开源的 MemFlywheel 走了另一条路：**文件原生（file-native）的记忆与自学习闭环**。记忆以 Markdown 文件落在本地，可检查、可 diff、可版本控制；重复出现的工作流被自动提炼成可复用的 learned skill，形成“越用越聪明”的飞轮。

![](~/assets/images/memflywheel-overview.png)

## 核心设计理念

MemFlywheel 不替代 Agent Harness，而是在宿主原有生命周期、模型、鉴权和工具体系之上，补上一层文件原生的记忆与自学习闭环。

- **文件原生（File-native）**：记忆和 learned skills 以可读文件沉淀，`MEMORY.md` 索引由扫描重建，source trace 保留可回溯证据。核心记忆文件和 learned skills 可按需纳入 Git，支持 diff、review 和版本回滚；source trace 与审计日志则按团队隐私策略管理。
- **宿主原生（Harness-native）**：以 npm 包形式接入 Pi、Hermes、OpenCode、OpenClaw 等开源 Agent 框架，不改造宿主架构。
- **模型无关（Model-agnostic）**：核心层不持有模型传输与鉴权，生成式步骤通过宿主模型契约完成。
- **闭环自学习（Closed-loop Learning）**：执行前召回，执行后沉淀，重复工作流演化为 learned skills，dream 再把冗余流程记忆压缩成技能线索。

## 记忆飞轮如何运转

MemFlywheel 不是“召回 + 存储”两件套，而是一条首尾相接、从记忆到自学习的闭环。

![](~/assets/images/memflywheel-lifecycle.png)

1. **召回（Recall）**。任务开始前，MemFlywheel 通过预召回（可选）或直接注入 `MEMORY.md` 索引线索，让宿主按需逐层深入到记忆正文、原始 source trace 和 learned skills。读多深由任务决定，绝不把整个记忆库塞进窗口。
2. **执行后抽取（Turn-end Extraction）**。对话一结束，抽取子代理就在后台自动开工，从增量对话里沉淀值得长期保存的信息，写成带溯源引用的类型化记忆，每条记忆都能回链到产生它的原始对话。
3. **技能演化（Skill Evolution）**。当你反复做同一类事，MemFlywheel 会察觉足够的完成轮次与工具调用密度，技能演化子代理把过程性知识提炼成 learned skill 包：沙箱暂存、校验通过才发布、失败自动回滚。
4. **Dream 整理（Dream Consolidation）**。趁 Agent 空闲，dream 过程整理记忆库：去重、合并、修复之外，还有**闭环的最后一步**，把散落在记忆里的冗余流程细节压缩成一条指向技能的路由线索。流程性知识从“记忆”毕业为“技能”，记忆库保持精简，下一轮预召回直接命中技能。

从预召回到抽取、演化、整理，全程不需要用户下任何指令。你唯一能感知到的，是 Agent 一次比一次更懂你。

![](~/assets/images/memflywheel-skill-flywheel.png)

这就是“飞轮”的含义：记忆喂养技能，技能反过来压缩记忆，每转一圈，Agent 的起点都比上一圈更高。整个过程中模型不输出任何“操作计划”，子代理的每一次文件工具调用本身就是变更，写入原子化、全程审计、失败不推进状态，可靠性由工程机制而非模型自觉来保证。

## 无缝接入

MemFlywheel 已经以原生插件形式接入四个开源 Agent Harness，后续会持续集成更多宿主。

| 宿主         | 安装方式                                                                  |
| ------------ | ------------------------------------------------------------------------- |
| **Pi**       | `pi install npm:@iflytekopensource/adapters`                              |
| **Hermes**   | `npm install -g @iflytekopensource/hermes` + `memflywheel-hermes-install` |
| **OpenCode** | `opencode plugin @iflytekopensource/adapters --global`                    |
| **OpenClaw** | `openclaw plugins install npm:@iflytekopensource/adapters`                |

MemFlywheel 作为原生记忆插件接入各宿主，不接管宿主模型、工具和权限体系；用户只需按宿主插件机制完成少量配置，就能把记忆召回、执行后沉淀、dream 整理和 learned skills 接到现有工作流里。

## 评测：LoCoMo 基准

MemFlywheel 当前在 LoCoMo Cat1/2/4 上的成绩：

| 指标      |       结果 | 配置                                            |
| --------- | ---------: | ----------------------------------------------- |
| LLM-judge | **81.23%** | `bge-m3` 向量召回 + DeepSeek V4 Flash 作答/评判 |
| Token-F1  | **65.93%** | 同一次运行                                      |

MemFlywheel 是 agent-driven 的记忆系统，同一份测评集换不同模型成绩也会有所差异：qwen3.7-plus 87.12%、DeepSeek V4 Flash 81.23%、GPT-4o-mini 76.89%。

放到公开系统的语境中（各系统评测配置不同，仅列有论文或官方基准的）：

| 系统             | 公开结果                      | 技术路线                             |
| ---------------- | ----------------------------- | ------------------------------------ |
| Mem0             | 67.13%（论文）/ 92.5%（最新） | 多级记忆 + 向量/图检索               |
| MemMachine       | 91.69%                        | 完整会话情景 + 上下文化检索          |
| Honcho           | 89.9%                         | 用户/Agent/群组建模的记忆服务        |
| **MemFlywheel**  | **76.89%–87.12%（随模型）**   | **文件原生，索引→正文→溯源逐层召回** |
| Memori           | 81.95%                        | 语义三元组 + 会话摘要                |
| Zep / Graphiti   | 75.14%–80.00%                 | 时序知识图谱                         |
| Letta Filesystem | 74.00%                        | 文件系统检索（search/grep/open）     |
| LangMem          | 58.10%–78.05%                 | LangGraph BaseStore                  |

值得注意的是：MemFlywheel 在**不引入向量数据库、不引入图数据库、记忆全程人类可读**的约束下，做到了与主流记忆系统同一梯队的成绩。这正是文件原生路线的价值主张。

## 工程实践

MemFlywheel 把记忆做成一套可治理的工程资产，而不是藏在服务端黑盒里。`MEMORY.md` 负责索引，类型化 Markdown 记忆负责承载事实、偏好、风格和流程经验，source trace 负责保留可回溯证据，learned skills 负责沉淀可复用工作流。索引可重建、文件可 diff、变更可审计，团队可以像管理代码一样管理 Agent 的长期记忆。

在写入链路上，MemFlywheel 采用原子写入、追加式审计和单库串行写锁，避免并发执行把记忆库写乱；在隐私链路上，`<private>` 标记内容会被确定性脱敏，明显的密钥、证件等高风险内容会被拦截在抽取阶段。它追求的不是“模型自己记得更好”，而是把记忆写入、召回、回溯和治理都放进可检查的工程流程里。

## 开源边界

MemFlywheel 的边界也刻意保持克制：它不重写主 Agent，不接管模型服务，不改变宿主的工具和权限体系。它通过宿主生命周期接入，在任务开始前补记忆线索，在任务结束后沉淀记忆与技能，让现有 Agent Harness 获得长期记忆和自学习闭环。

这也是它能接入 Pi、Hermes、OpenCode、OpenClaw 等开源 Agent 框架的原因：宿主仍然是宿主，MemFlywheel 只是补上记忆飞轮这一层。技能由 MemFlywheel 存储、召回和镜像到宿主侧，是否加载、何时执行、执行权限如何控制，仍由宿主框架决定。

## 快速体验

- GitHub 仓库：[iflytek/memflywheel](https://github.com/iflytek/memflywheel)
- npm 包：[@iflytekopensource/adapters](https://www.npmjs.com/package/@iflytekopensource/adapters)（另在 GitHub Packages 以 `@iflytek/*` 同步发布）
- 许可证：Apache-2.0

MemFlywheel 让 Agent 的记忆不再是黑盒，而是看得见、改得了、版本可控的工程资产，并且每一次运行，都在为下一次运行积累复利。

![](~/assets/images/memflywheel-card.png)
