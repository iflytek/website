---
publishDate: 2026-08-11T00:00:00Z
title: '从使用者到贡献者 - 科大讯飞与 agentgateway 的故事'
excerpt: '科大讯飞如何从评估 agentgateway 到积极参与贡献，与开源社区建立更深层次的关系。'
category: 'community'
image: '/img/blog/iflytek-journey/iflytek-agentgateway.png'
tags: ['agentgateway', 'iflytek', 'community', 'open-source', 'mcp', 'a2a']
author: 'Dong Jiang, agentgateway PMC'
lang: 'zh'
translationId: 'iflytek-agentgateway-journey'
---

# 从使用者到贡献者 - 科大讯飞与 agentgateway 的故事

![科大讯飞与 agentgateway](/img/blog/iflytek-journey/iflytek-agentgateway.png)

科大讯飞是一家总部位于中国合肥的上市 AI 公司，成立于 1999 年。我们以语音语言技术闻名——包括语音识别、机器翻译和认知智能，近年来更因星火大模型系列及构建其上的智能体平台而受到关注。

在科大讯飞内部，我们的团队负责构建支撑内部智能体应用的基础设施，例如 [astron-agent](https://github.com/iflytek/astron-agent)，该项目截至 2026 年 8 月 7 日曾在 GitHub 热门排行榜排名第一。我们的工作包括通过 MCP 连接智能体与工具、通过 A2A 实现智能体间通信，以及将流量路由到 LLM 后端。

这些基础设施正是 agentgateway 进入我们视野的地方。

## 我们与 agentgateway 的旅程

我们从 2026 年春天开始评估 agentgateway，并在测试环境中运行了大约三个月。

对于一个年轻的项目来说，体验出奇地顺畅。单二进制文件部署模式使采用变得简单——我们不需要拼凑代理、MCP 中间件和独立的可观测性组件。开箱即用，我们就获得了路由、认证以及对 MCP 流量的 OpenTelemetry 可见性。

当我们遇到一些粗糙的地方时，社区响应迅速。我们提交的问题在几天内就收到了有意义的回复。这种体验最终将我更深入地拉入了项目，正如你将在下面看到的，从一个用户变成了一个贡献者。

## 为什么选择 agentgateway？

有三点特别突出。

**1. MCP 和 A2A 是一等公民。**

大多数网关将 AI 流量视为"带有额外步骤的 HTTP"。agentgateway 原生理解 MCP 会话、工具调用和 A2A 消息流。这意味着我们可以在智能体实际运行的层面应用策略和可观测性——每个工具、每个会话、每次交互——而不仅仅是每个 HTTP URL。

**2. 统一的数据平面。**

我们已经在 API 网关后面运行传统的微服务流量。拥有一个可以处理 HTTP、gRPC、MCP、A2A 和 LLM 流量的单一网关——而不是引入单独的"AI sidecar"——符合我们平台团队降低运营复杂性和减少移动部件数量的目标。

**3. 性能和治理。**

Rust 实现的占用空间足够小，可以在我们的工作负载旁边运行而不会产生显著的资源共享开销。同样重要的是，该项目在 Agentic AI Foundation 下的治理给了我们大型组织在标准化开源组件之前需要的供应商中立的信心。

## 我们还评估了哪些项目？

我们查看了三大类解决方案：

- **带有 AI 插件的经典 API 网关**，如 Kong 和 Apache APISIX。这些成熟且经过实战检验，但 AI 能力在很大程度上是对现有 API 网关模型的扩展。它们适用于南北向 LLM 代理，但不太自然地适合 MCP 会话语义。
- **基于 Envoy 的 AI 网关**，包括 Envoy AI Gateway 和 kgateway。这些功能强大，受益于成熟的生态系统，但要实现我们想要的 MCP 感知行为，将需要我们自己承担更多的扩展工程。
- **专注于 LLM 的代理**，如 LiteLLM 风格的网关。这些在模型路由和令牌计数方面表现出色，但通常停留在 LLM 边界。它们不对智能体到工具和智能体到智能体通信提供相同级别的治理——而这正是我们看到重大运营和安全问题出现的地方。

agentgateway 是唯一一个专门为**整个智能体连接路径**构建的选项。

## 我们在过程中做出了哪些关键决策？

我们对 agentgateway 的采用也促使我们做出了几个架构决策：

1. **标准化 MCP。** 我们选择 MCP 作为智能体平台和内部工具之间的集成契约，而不是为每个工具构建定制的 REST 适配器。
2. **将策略放在网关，而不是智能体中。** 工具访问的认证、授权和审计日志记录都放在 agentgateway 中。这为每个智能体——无论由哪个框架或团队构建——提供了一致的安全态势。
3. **向上游贡献而不是维护分叉。** 当我们发现差距时，我们选择在开放的环境中解决它们并将修复贡献给上游。这使我们的部署与主线项目保持接近，同时让改进惠及更广泛的社区。

## 我们今天如何使用 agentgateway

早期，我们花了半天时间追踪一个神秘的延迟峰值。最终，我们发现是我们的一个 MCP 服务器保持会话打开时间超过预期。网关的每会话指标几乎立即给了我们答案，一旦我们停止猜测并实际查看仪表板。

这段经历强化了我们现在认为基本的东西：**智能体基础设施需要从第一天起就具备可观测性。**

## 从用户到贡献者

在我们开始运行 agentgateway 大约两个月后，我开始阅读源代码来回答部署问题。不久，我在 7 月初提交了第一个拉取请求。

从那以后，我提交了十几个拉取请求，其中大部分已合并，涵盖了项目的几个领域。

### Kubernetes 控制器正确性

我贡献了使 Kubernetes API 与上游约定保持一致的修复。例如：

- 将 `PolicyConditionType` 和 `PolicyConditionReason` 转换为字符串类型别名以匹配 `metav1.Condition`（[#2815](https://github.com/agentgateway/agentgateway/pull/2815)）。
- 用 `apiequality.Semantic.DeepEqual` 替换 `reflect.DeepEqual`，以消除由 `metav1.Time` 比较引起的虚假差异（[#2687](https://github.com/agentgateway/agentgateway/pull/2687)）。

这些听起来可能是相对较小的变化，但当你在大规模运行 Kubernetes 基础设施时，控制器层的正确性至关重要。

### 性能

性能也一直是我们关注的领域：

- 使用有界并发并行化 JWKS 获取（[#2594](https://github.com/agentgateway/agentgateway/pull/2594)）。
- 致力于从 informer 缓存中删除未使用的字段以减少控制器内存消耗（[#2686](https://github.com/agentgateway/agentgateway/pull/2686)）。

### 可观测性

我添加了 `agentgateway_controller_build_info` 指标，并在此过程中修复了 `SetRegistry` 生命周期问题（[#2399](https://github.com/agentgateway/agentgateway/pull/2399)）。

### 测试和 lint 基础设施

我还为项目的工程基础设施贡献了改进，包括：

- 添加 `goleak` 以检测控制器包中的 goroutine 泄漏（[#2419](https://github.com/agentgateway/agentgateway/pull/2419)）。
- 修复 `gosec` 和 `kube-api-linter` 配置（[#2366](https://github.com/agentgateway/agentgateway/pull/2366)）。

### MCP 本身

与我们实际经验最接近的贡献之一是重构 MCP 会话错误处理，添加 `MissingClientCapability` 支持，目前正在审查中（[#2645](https://github.com/agentgateway/agentgateway/pull/2645)）。

这是我最欣赏为基础设施项目贡献的部分之一：实际使用改变了你注意到的问题类型。一旦你自己操作过 MCP 会话，一些边缘情况就不再看起来是理论上的了。

### 并非每个贡献都需要合并

当然，并非每个 PR 都被合并。

我提出添加 `fgprof` 分析端点到管理服务器的提议（[#2464](https://github.com/agentgateway/agentgateway/pull/2464)）最终在讨论后被关闭。

我实际上认为这是健康开源社区的标志。

维护者没有简单地橡皮图章通过提议。他们参与了想法，解释了权衡，最终决定不合并它。讨论本身加深了我对项目管理服务器设计的理解。

这是开源的重要部分：**贡献不仅仅是让你的代码被合并。而是参与工程对话。**

## 从个人贡献者到贡献公司

这段旅程中最有回报的部分之一是看到关系超越了个人贡献而演变。

作为一个在中国贡献的人，处于不同的时区和企业环境，最让我印象深刻的是社区对我们贡献的响应速度和质量。

当我提交 [website#826](https://github.com/agentgateway/website/issues/826) 将科大讯飞添加到贡献公司部分时，也发生了同样的经历。维护者花时间验证贡献并直接与我们互动。

这种互动很重要。

它将一个你**使用**的开源项目变成一个你**想要贡献**的项目。

最终，它将个人贡献者转变为贡献公司。

## 经验教训

我们与 agentgateway 的旅程教会了我们几个教训。

### 1. 智能体流量不是 API 流量

智能体通信与传统的请求/响应 API 根本不同。

会话可以是长期存在的。通信可以是双向的。状态很重要。工具调用可以触发额外的智能体交互。

纯粹围绕无状态 HTTP 请求/响应语义设计的基础设施需要为这个新模型演进。尽早理解这种区别帮助我们避免了架构返工。

### 2. 可观测性应该放在第一位

从第一天起就对 MCP 和 A2A 流量进行检测。

如果没有对会话、工具调用、延迟和错误的可见性，很容易花费数小时调试症状而不是理解底层行为。

我们自己在"神秘延迟峰值"方面的经验使这个教训非常真实。

### 3. 将策略放在智能体外部

安全不应该依赖于每个单独的智能体正确实现认证、授权和审计。

在网关卡住这些问题为我们提供了跨智能体、工具和团队的一致策略表面——并使这些策略随着平台增长而更容易演进。

### 4. 上游胜过分叉

我们向上游贡献的每个补丁都是我们不必自己维护的一个补丁。

更重要的是，上游贡献使项目对所有运行类似工作负载的人都更好。

对我们来说，阅读源代码来回答部署问题结果是理解项目最快的方法之一。将这些改进贡献回去是自然的下一步。

## 结论

对于科大讯飞，agentgateway 将"智能体连接"从一堆胶水代码转变为一个受治理和可观测的基础设施层：**一个网关、一个策略表面，以及跨 MCP、A2A 和 LLM 流量的一个审计轨迹。**

但技术只是故事的一部分。

从评估一个开源项目开始，变成动手采用，然后是个人贡献，最终成为科大讯飞与 agentgateway 社区之间的关系。

这段旅程是与 agentgateway 合作中最有回报的部分之一。

如果你正在构建智能体系统，并在思考安全性、可观测性和连接性应该放在哪里，请尝试一下 agentgateway。当你遇到粗糙的边缘时，不要只是绕过它。打开一个问题。开始一个讨论。发送一个 PR。

你可能会惊讶这段旅程会把你带到哪里。

---

_本文最初发布于 [agentgateway.dev](https://agentgateway.dev/blog/2026-08-11-iflytek-journey-adopter-to-contributor)_
