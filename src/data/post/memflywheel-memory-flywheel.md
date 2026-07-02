---
publishDate: 2026-07-01T00:00:00Z
title: 'MemFlywheel：给 AI Agent 装上文件原生记忆飞轮'
excerpt: 'MemFlywheel 是面向 Agent Harness 的文件原生记忆飞轮，通过执行前召回、执行后沉淀和 dream 整理，让 Agent 每一次运行都更懂你。'
image: '~/assets/images/memflywheel-overview.png'
category: 'tech'
tags: ['memflywheel', 'ai-agent', 'memory', 'open-source']
author: 'iFLYTEK Open Source Team'
---

# MemFlywheel：给 AI Agent 装上文件原生记忆飞轮

AI Agent 正在快速走向生产落地，但一个核心问题始终困扰着开发者：**Agent 如何记住过去的经验，并在下一次做得更好？**

目前大多数 Agent 框架将记忆交给模型上下文窗口或外部向量数据库，前者受限于窗口大小，后者则引入了额外的复杂度和延迟。科大讯飞开源的 **MemFlywheel** 提出了一种不同的思路——**文件原生（file-native）记忆飞轮**，让 Agent 的记忆以 Markdown 文件的形式持久化在本地，可检查、可 diff、可版本控制。

![](~/assets/images/memflywheel-overview.png)

## 核心设计理念

MemFlywheel 的定位非常明确：**它不替代 Agent Harness，而是作为记忆与学习的增强层**。宿主 Agent Harness 继续负责生命周期管理、模型访问、鉴权和工具调用；MemFlywheel 则专注于记忆闭环。

这一设计遵循三个原则：

- **文件原生（File-native）**：所有记忆、source trace 和 learned skills 都以 Markdown 文件存储，开发者可以直接查看、编辑和版本控制，无需依赖专用数据库。
- **宿主原生（Harness-native）**：通过 npm 包的方式接入 Pi、Hermes、OpenCode 和 OpenClaw 等主流 Agent Harness，不需要改造宿主架构。
- **模型无关（Model-agnostic）**：MemFlywheel 不绑定任何特定模型，可以在不同的 LLM 后端上运行。

## 记忆飞轮如何运转

MemFlywheel 的核心是一个完整的记忆生命周期，分为四个阶段：

![](~/assets/images/memflywheel-lifecycle.png)

### 1. 执行前召回（Pre-recall）

在 Agent 执行任务之前，MemFlywheel 首先从 `MEMORY.md` 索引文件中读取线索，然后逐层加载记忆正文、source trace 和 learned skills。这种渐进式的召回机制确保了 Agent 在开始工作前就能获取到相关的历史经验。

### 2. 执行后提取（Turn-end Extraction）

当一轮对话或任务结束后，MemFlywheel 自动从交互记录中提取关键信息，将其转化为结构化的长期记忆。这些记忆以 Markdown 格式持久化到本地文件系统中。

### 3. Dream 整理（Dream Consolidation）

在 Agent 空闲时，MemFlywheel 会触发 dream 整理过程——对已有记忆进行去重、合并和修复，确保记忆仓库保持整洁和高效。

### 4. 技能飞轮（Skill Flywheel）

当 Agent 反复执行类似的工作流时，MemFlywheel 会将这些模式提炼为 **learned skills**——可复用的技能文件。Agent 可以直接检查、修改和调用这些技能，实现真正的"越用越聪明"。

![](~/assets/images/memflywheel-skill-flywheel.png)

## 多宿主支持

MemFlywheel 通过 npm 包的形式接入了四种主流 Agent Harness：

| 宿主         | 安装方式                                                                  |
| ------------ | ------------------------------------------------------------------------- |
| **Pi**       | `pi install npm:@iflytekopensource/adapters`                              |
| **Hermes**   | `npm install -g @iflytekopensource/hermes` + `memflywheel-hermes-install` |
| **OpenCode** | `opencode plugin @iflytekopensource/adapters --global`                    |
| **OpenClaw** | `openclaw plugins install npm:@iflytekopensource/adapters`                |

每个宿主都只需要安装对应的 npm 包，MemFlywheel 会作为原生记忆插件接入，无需修改宿主的模型、工具或权限配置。

## 工程实践

### 存储结构

MemFlywheel 的记忆仓库是一个标准的文件目录，核心文件包括：

- `MEMORY.md`：记忆索引文件，包含所有记忆的摘要和线索
- 记忆正文：每个记忆条目一个 Markdown 文件，包含完整的上下文和 source trace
- Learned Skills：提炼后的可复用技能文件

这种结构使得记忆可以无缝集成到现有的 Git 工作流中，支持 diff、review 和回滚。

### 评测体系

MemFlywheel 使用面向 LoCoMo 的回归检查来衡量长期记忆能力。在召回、提取和 learned skill 闭环的持续演进过程中，评测体系确保每一步改进都是可量化的。

## 开源边界

MemFlywheel 有清晰的开源边界：它专注于记忆与学习闭环，不会将主 Agent、模型服务、工具权限或技能执行纳入自身。这一设计保证了 MemFlywheel 可以作为一个纯粹的基础组件，在各种 Agent Harness 中复用。

## 快速体验

- GitHub 仓库：[iflytek/memflywheel](https://github.com/iflytek/memflywheel)
- npm 包：[@iflytekopensource/adapters](https://www.npmjs.com/package/@iflytekopensource/adapters)
- 许可证：Apache-2.0

MemFlywheel 让 Agent 的记忆不再是黑盒，而是看得见、改得了、版本可控的工程资产。如果你的 Agent Harness 缺少一个可靠的记忆层，MemFlywheel 值得尝试。
