---
publishDate: 2026-07-01T00:00:00Z
title: 'Domux：150ms 内的智能家居指令理解模型'
excerpt: 'Domux 基于 Gemma-4-E2B-it 微调，将自然语言智能家居指令转换为结构化槽位，端到端延迟控制在 150ms 以内，结果准确率达 98.37%。'
image: '~/assets/images/domux-arch.png'
category: 'tech'
tags: ['domux', 'smart-home', 'nlp', 'llm', 'open-source']
author: 'iFLYTEK Open Source Team'
---

# Domux：150ms 内的智能家居指令理解模型

智能家居的核心体验之一是**语音或文本指令的快速响应**。用户说"把客厅灯调暗一点"，系统需要在极短的时间内理解意图、解析参数并下发控制指令。传统的方案依赖规则引擎或大型语言模型 API，前者缺乏泛化能力，后者延迟过高。

科大讯飞开源的 **Domux**（`Domux-Gemma-4-E2B-it`）探索了一条新路径：**在极致延迟预算（端到端 < 150ms）下，文本语义解析能做到什么程度？** 这是一个早期实验，也是一份开放邀请——我们把它分享出来，希望有更多人一起尝试。

![](~/assets/images/domux-arch.png)

## 技术方案

Domux 基于 **Gemma-4-E2B-it**（Gemma 4 系列的 2B 参数指令微调版）进行进一步微调。核心训练流程结合了两阶段方法：

1. **监督微调（SFT）**：使用高质量的智能家居指令-槽位对齐数据，让模型学会将自然语言转换为结构化输出。
2. **GRPO 强化学习**：通过 Group Relative Policy Optimization 和自定义奖励函数，进一步优化模型的格式合规性和结果准确率。

### 输出格式

Domux 的输出是一个固定的 7 字段竖线分隔格式：

```
action|device|attribute|value|unit|room|floor
```

每个字段含义明确：

| 字段        | 含义     | 示例                                 |
| ----------- | -------- | ------------------------------------ |
| `action`    | 控制动作 | `turnOn`、`set`、`adjustUp`          |
| `device`    | 设备类型 | `Light`、`AC`、`Curtain`             |
| `attribute` | 控制属性 | `brightness`、`temperature`、`color` |
| `value`     | 目标值   | `80`、`24`、`Blue`                   |
| `unit`      | 单位     | `Percent`、`Celsius`、`Kelvin`       |
| `room`      | 房间     | `Living Room`、`Master Bedroom`      |
| `floor`     | 楼层     | `Second Floor`、`Ground Floor`       |

使用 `*` 表示未指定或无关字段。

## 核心能力

### 设备泛化

Domux **不依赖固定的设备白名单**。模型通过语义理解来处理设备名称，支持同一类别下的任意命名变体（如 Light、Strip Light、Spot Light、Desk Lamp 等），而不是硬编码的设备列表。

### 多动作支持

对于包含多个动作的复合指令，Domux 会输出多行槽位：

```
输入：Turn on the main light in the master bedroom on the second floor, set brightness to 80%, color temperature to 4000K, color to blue, and switch to reading mode

输出：
turnOn|Light|*|*|*|Master Bedroom|Second Floor
set|Light|brightness|80|Percent|Master Bedroom|Second Floor
set|Light|colorTemperature|4000|Kelvin|Master Bedroom|Second Floor
set|Light|color|Blue|*|Master Bedroom|Second Floor
set|Light|mode|Reading|*|Master Bedroom|Second Floor
```

### 模糊指令处理

对于没有明确数值的调整指令（如"调亮一点"、"温度调低一些"），模型会输出 `adjustUp` 或 `adjustDown`，值字段留空（`*`），由下游系统根据当前状态决定调整幅度。

## 性能评测

Domux 在涵盖 4 个维度（单意图、多意图、属性省略、非标准命名）的 **4,057 个样本**的综合测试集上进行了评估，与 **11 个主流模型**进行了基准对比，包括 Qwen3.5 系列（2B-27B）、Gemma 4 系列以及 DeepSeek-V4、Claude Haiku 4.5、Gemini 3.5 Flash 等闭源 API。

![](~/assets/images/domux-benchmark.png)

评测结果显示：

- **98.37% 结果准确率**：在正确解析指令意图和参数方面表现优异
- **100% 格式合规性**：所有输出严格遵循 7 字段竖线分隔格式
- **超越更大模型**：在特定任务上超越了参数量大数倍的模型

完整技术报告：[中文报告](https://github.com/iflytek/domux/blob/main/docs/benchmark-report.zh.pdf) · [English Report](https://github.com/iflytek/domux/blob/main/docs/benchmark-report.pdf)

## 部署方案

Domux 支持两种推理后端：

### vLLM 部署

```bash
pip install "vllm==0.22.0"

python -m vllm.entrypoints.openai.api_server \
  --model Domux \
  --served-model-name domux \
  --dtype bfloat16 \
  --max-model-len 2048
```

### SGLang 部署

```bash
pip install "sglang[all]==0.5.12"

python -m sglang.launch_server \
  --model-path Domux \
  --dtype bfloat16 \
  --context-length 2048
```

两种部署方式均暴露 OpenAI 兼容接口，硬件要求为 BF16 精度下单卡 20GB+ 显存。

### API 调用

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")

response = client.chat.completions.create(
    model="domux",
    messages=[{"role": "user", "content": "Set the living room light brightness to 80%"}],
    temperature=0.0
)
print(response.choices[0].message.content)
# set|Light|brightness|80|Percent|Living Room|*
```

## 开源数据集

我们同步开源了评测用的**测试集**（4,057 条样本）和**评测脚本**，方便社区独立复现结果或评估自己的模型：

```bash
pip install requests
# 在 run_eval.py 中填入 API_KEY / BASE_URL / MODEL 后运行
python eval/run_eval.py
```

## 路线图

作为早期探索，Domux 后续计划聚焦三个方向：

- **更广的设备覆盖**：在灯具、温控、窗饰、音频之外扩展更多品类
- **更丰富的场景**：支持更多场景与模式
- **更强的模糊意图理解**：更好地处理含糊、隐含和依赖上下文的指令

## 快速体验

- Hugging Face：[iFlytekOpenSource/Domux](https://huggingface.co/iFlytekOpenSource/Domux)
- ModelScope：[iflytek/domux](https://modelscope.cn/models/iflytek/domux)
- GitHub：[iflytek/domux](https://github.com/iflytek/domux)
- 许可证：Apache-2.0

Domux 是一次关于"极致延迟下文本语义解析能做到什么"的实验。如果你的智能家居项目需要低延迟、高准确率的指令理解能力，欢迎尝试并一起探索。

![](~/assets/images/domux-card.png)
