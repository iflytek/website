---
publishDate: 2026-05-15T00:00:00Z
title: 'SkillHub：企业级 Agent 技能注册中心的开源之路'
excerpt: '介绍 SkillHub 如何帮助企业构建私有的 Agent 技能市场，实现技能的发布、版本管理、RBAC 权限治理和审计追踪。'
category: 'tech'
image: '~/assets/images/skillhub.jpg'
tags: ['skillhub', 'agent-skill', 'registry', 'enterprise-ai']
author: 'iFLYTEK Open Source Team'
---

# SkillHub：企业级 Agent 技能注册中心的开源之路

在 AI Agent 生态中，技能（Skill）是 Agent 能力的核心载体。然而，企业在管理 Agent 技能时常常面临以下痛点：

- 技能散落在各个团队，缺乏统一管理
- 技能版本混乱，难以追溯
- 缺乏权限控制，安全合规风险高
- 没有技能发现机制，重复建设严重

SkillHub 正是为了解决这些问题而设计的开源 Agent 技能注册中心。

## 核心功能

### 技能发布与版本管理

SkillHub 支持语义化版本控制，每个技能包可以有不同的发布标签（`beta`、`stable`），并自动追踪 `latest` 版本：

```bash
# 通过 CLI 发布技能
skillhub publish my-skill --version 1.2.0 --tag stable
```

### 全文搜索与发现

支持多维度搜索和筛选：

- 按命名空间过滤
- 按下载量、评分排序
- 按时间范围筛选
- 可见性规则控制

### 团队命名空间

每个团队可以拥有独立的命名空间：

- 独立的成员管理
- 角色权限（Owner / Admin / Member）
- 发布策略控制

### RBAC 权限治理

企业级的权限管理体系：

```
平台管理员 → 全局策略制定
├── 团队管理员 → 命名空间内审核
│   ├── 发布者 → 技能发布权限
│   └── 使用者 → 技能安装权限
```

所有治理操作均有完整的审计日志。

## 快速开始

一条命令即可启动完整的本地开发环境：

```bash
rm -rf /tmp/skillhub-runtime
curl -fsSL https://imageless.oss-cn-beijing.aliyuncs.com/runtime.sh | sh -s -- up
```

## 技术栈

- **后端**：Java 21 + Spring Boot
- **前端**：React 19 + TypeScript
- **存储**：支持本地文件系统 / S3 / MinIO
- **部署**：Docker / Kubernetes
- **国际化**：i18next 多语言支持

## 社区与贡献

SkillHub 采用 Apache 2.0 许可证开源，欢迎社区参与贡献。

---

> 了解更多：[GitHub 仓库](https://github.com/iflytek/skillhub) | [用户文档](https://iflytek.github.io/skillhub/)
