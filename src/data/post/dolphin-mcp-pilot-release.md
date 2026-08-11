---
publishDate: 2026-08-10T00:00:00Z
title: 'Dolphin MCP Pilot：让 AI Agent 真正操作 DolphinScheduler'
excerpt: 'Dolphin MCP Pilot 是一个面向 Apache DolphinScheduler 的生产级 MCP Server，提供 58 个工具覆盖工作流创建、调度管理、实例控制、资源操作等实战场景，让 AI Agent 从"看数据"升级到"做调度"。'
category: 'tech'
tags: ['dolphin-mcp-pilot', 'mcp', 'dolphinscheduler', 'ai-agent', 'workflow', 'open-source']
author: 'iFLYTEK Open Source Team'
---

# Dolphin MCP Pilot：让 AI Agent 真正操作 DolphinScheduler

AI Agent 正在渗透到企业的每一个角落，而**大数据调度平台**作为数据基础设施的核心，长期停留在"人看大屏、手动点按钮"的模式。能不能让 Agent 直接操作 DolphinScheduler——一句话建工作流、一键改调度、出问题自动排查？

科大讯飞开源的 **Dolphin MCP Pilot** 给出了答案：一个面向 **Apache DolphinScheduler** 的生产级 MCP Server，提供 **58 个工具**，覆盖从项目、工作流、调度、实例到资源、日志、监控的全链路操作。它不是又一个"只读列表"演示品，而是为**真实运维场景**而生。

## 为什么要做这个项目？

社区里已有一些 DolphinScheduler 的 MCP 实现，但大多停留在基础读写：列项目、启停工作流、看看日志。一旦涉及真实的调度运维——创建 SQL 工作流、管理 Cron 调度、补数据、强制成功失败任务、回滚版本——这些工具就无能为力了。

Dolphin MCP Pilot 从第一天就瞄准 **real operations work**：

- 一句话创建 SQL 或 DAG 工作流
- 调度生命周期全管理（创建 / 上线 / 下线 / 删除）
- 流程实例精细控制（暂停 / 恢复 / 重跑 / 从失败处重跑）
- 任务级干预（强制成功 / 跳过失败节点）
- 资源内容管理与版本回滚
- 原始 API 透传作为安全阀

## 技术方案

Dolphin MCP Pilot 基于 **Model Context Protocol (MCP)** 构建，暴露标准的 HTTP + SSE 接口，任何支持 MCP 的 AI Agent（Claude Desktop、Cursor、Cline、CodeBuddy，或自研 Agent）都能即插即用。

### 工具矩阵

58 个工具按职责分为七大类：

| 类别           | 覆盖场景                                     | 典型工具                                                          |
| -------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| **项目管理**   | 租户 / 项目 CRUD、权限控制                   | `ds_create_project`、`ds_list_projects`                           |
| **工作流编排** | SQL / DAG 工作流创建、任务节点管理、版本控制 | `ds_create_workflow`、`ds_update_task_param`、`ds_clone_workflow` |
| **调度管理**   | Cron 调度创建 / 上线 / 下线、补数据          | `ds_set_schedule`、`ds_online_schedule`、`ds_complement_data`     |
| **实例控制**   | 运行 / 暂停 / 恢复 / 重跑 / 删除，任务级干预 | `ds_rerun_process_instance`、`ds_force_task_success`              |
| **资源管理**   | 文件上传 / 下载 / 内容查看 / 更新            | `ds_list_resources`、`ds_update_resource_content`                 |
| **日志监控**   | 任务日志、实例状态、`next_action` 引导排查   | `ds_get_task_log`、`ds_list_task_instances`                       |
| **API 透传**   | 未覆盖接口的安全阀                           | `ds_raw_get` / `ds_raw_post` / `ds_raw_put` / `ds_raw_delete`     |

### 双认证模式

支持两种认证方式，适配不同部署场景：

- **API Token**（`X-DS-Token`）：适合单租户 / 服务间调用
- **用户名 + 密码**（`X-DS-User` + `X-DS-Password`）：适合多租户按需认证

多租户 HTTP 模式下，每个调用方可携带自己的凭据，MCP Server 自动透传给 DolphinScheduler，无需修改 Agent 端逻辑。

### 智能引导

工具返回结果中内嵌 **`next_action` 提示**，引导 Agent 进行下一步操作。例如，查询流程实例时，对 RUNNING 和 FAILURE 状态的实例会自动附加提示，指向 `ds_list_task_instances` 以检查具体任务节点——让 Agent 从"看到状态"自然过渡到"定位问题"。

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/iflytek/dolphin-mcp-pilot.git
cd dolphin-mcp-pilot

# 2. 配置环境
cp .env.example .env
# 编辑 .env，至少设置 DS_URL 和 DS_TOKEN（或 DS_USER/DS_PASSWORD）

# 3. 启动服务
docker compose --profile dev up -d dolphin-mcp-pilot-dev
```

服务默认运行在 `http://localhost:8001/mcp/`。

### 接入 AI Agent

以 Claude Desktop 为例，在配置文件中添加：

```json
{
  "mcpServers": {
    "dolphin-scheduler": {
      "url": "http://localhost:8001/mcp/",
      "headers": {
        "X-DS-Token": "your-dolphin-token"
      }
    }
  }
}
```

现在你可以对 Agent 说：

> "帮我在 data-team 项目下创建一个 SQL 工作流，每天凌晨 2 点执行 `SELECT * FROM user_behavior WHERE dt = '${bizdate}'`，失败自动重试 3 次。"

Agent 会自动调用 `ds_create_workflow` → `ds_set_schedule` → `ds_online_schedule`，完成从建流到上线的完整闭环。

## 典型场景

### 场景 1：一句话建调度

> "创建补数任务，把 7 月 1 号到 7 月 31 号的日报表全部重跑一遍。"

Agent 调用 `ds_complement_data`，串行补数使用 `complementStartDate` / `complementEndDate` 范围格式，确保 DolphinScheduler 按天严格顺序生成实例。

### 场景 2：故障自动排查

> "昨天的 ETL 任务为什么失败了？"

Agent 先调用 `ds_list_process_instances` 找到失败实例，根据返回的 `next_action` 提示，继续调用 `ds_list_task_instances` 定位到具体失败节点，最后调用 `ds_get_task_log` 拉取日志——整个排查链路无需人工介入。

### 场景 3：版本回滚

> "把 user_analysis 工作流回滚到上一个版本。"

Agent 调用 `ds_rollback_workflow_version`，自动定位历史版本并恢复，避免手动在 UI 上翻找。

## 路线图

Dolphin MCP Pilot 刚刚起步，后续计划聚焦：

- **更多 DolphinScheduler 版本兼容**：覆盖 3.x 与 2.x 的接口差异
- **更丰富的 DAG 模板**：预置常见数据 pipeline 模式（CDC、特征工程、报表分发）
- **Agent 协作编排**：多个 MCP Server 联动，让调度 Agent 与数据质量 Agent、告警 Agent 协同工作

## 快速体验

- GitHub：[iflytek/dolphin-mcp-pilot](https://github.com/iflytek/dolphin-mcp-pilot)
- 许可证：Apache-2.0
- 文档：[安装](https://github.com/iflytek/dolphin-mcp-pilot/blob/main/docs/INSTALLATION.md) · [配置](https://github.com/iflytek/dolphin-mcp-pilot/blob/main/docs/CONFIGURATION.md) · [功能清单](https://github.com/iflytek/dolphin-mcp-pilot/blob/main/docs/FEATURES.md) · [API 参考](https://github.com/iflytek/dolphin-mcp-pilot/blob/main/docs/API.md)

Dolphin MCP Pilot 把 DolphinScheduler 从一个"人操作的调度平台"变成"Agent 可直接调用的工作流引擎"。如果你的团队正在用 DolphinScheduler 管理数据 pipeline，欢迎接入体验并一起共建。
