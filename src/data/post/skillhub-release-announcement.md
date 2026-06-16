---
publishDate: 2026-03-15T00:00:00Z
title: 'SkillHub 正式发布：开源企业级 Agent 技能注册中心'
excerpt: 'iFLYTEK 正式发布 SkillHub，一个面向企业的开源 Agent 技能注册中心，帮助企业构建私有的技能市场。'
category: 'news'
image: '~/assets/images/release.png'
tags: ['skillhub', 'release', 'announcement']
author: 'iFLYTEK Open Source Team'
---

# SkillHub 正式发布

今天，我们很高兴地宣布 SkillHub 正式开源发布！

![](~/assets/images/skillhub-release.gif)

## 什么是 SkillHub？

SkillHub 是一个自托管的 Agent 技能注册中心，为企业提供一个私有、受治理的平台来共享和管理 Agent 技能。

## 为什么需要 SkillHub？

随着 AI Agent 在企业中的广泛应用，团队需要一种标准化的方式来：

1. **发布和版本管理** Agent 技能包
2. **发现和复用** 已有的技能
3. **治理和审计** 技能的使用
4. **安全合规** 地管理企业知识资产

## 核心亮点

- **私有化部署**：在企业防火墙内部署，完全的数据主权
- **语义化版本**：支持 beta、stable 等标签，自动追踪 latest
- **团队命名空间**：按团队组织技能，独立的成员和权限管理
- **审核治理**：平台管理员和团队管理员分级审核
- **社交功能**：收藏、评分、下载统计
- **CLI 优先**：原生 REST API + CLI 工具

## 快速体验

```bash
# 一键启动
curl -fsSL https://imageless.oss-cn-beijing.aliyuncs.com/runtime.sh | sh -s -- up

# 发布你的第一个技能
skillhub publish my-first-skill --version 0.1.0
```

## 加入社区

- GitHub: [github.com/iflytek/skillhub](https://github.com/iflytek/skillhub)
- 文档: [iflytek.github.io/skillhub](https://iflytek.github.io/skillhub/)
- Discord: [加入讨论](https://discord.gg/qHYvtDNPHS)

我们期待你的参与和贡献！
