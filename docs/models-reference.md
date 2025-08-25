# AI Models Reference

This document provides comprehensive information about all 110+ supported AI models in the compare-models tool.

## Model Metadata

Each model includes the following metadata:

- **Company**: The organization that developed the model
- **Model Name**: Human-readable name of the model
- **Model Identifier**: Unique identifier used in API calls
- **Context**: Maximum context window size in tokens (null for embedding models)
- **Input Cost**: USD cost per million input tokens
- **Output Cost**: USD cost per million output tokens (null for embedding models)
- **Providers**: List of API providers that support this model
- **Release Date**: When the model was first released
- **Tier**: Model size classification (small/normal/large)
- **Can Generate Image**: Whether the model supports image generation
- **Has Reasoning**: Whether the model has advanced reasoning capabilities

## Model Tiers

### Small Tier Models
- Optimized for speed and cost-efficiency
- Suitable for simple tasks and high-volume applications
- Examples: GPT-5 nano, GPT-4o mini, Claude 3 Haiku

### Normal Tier Models  
- Balanced performance and cost
- Good for most general-purpose applications
- Examples: GPT-5 mini, Gemini 2.0 Flash, DeepSeek V3.1

### Large Tier Models
- Maximum capability and performance
- Best for complex reasoning and specialized tasks
- Examples: GPT-5, Claude Sonnet 4, Gemini 2.5 Pro

## Special Capabilities

### Image Generation Models
Models that can generate images from text prompts:
- GPT-4o, GPT-4o mini, GPT-4.1 series
- Gemini 2.0/2.5 series
- Grok 2, Grok 3, Grok 4
- Nova Pro

### Reasoning Models
Models with advanced reasoning and chain-of-thought capabilities:
- Claude 3.7 Sonnet (hybrid reasoning)
- DeepSeek R1, DeepSeek V3.1 Thinking
- o3, o3-mini, o4-mini (OpenAI reasoning models)
- Gemini 2.5 Flash, Gemini 2.5 Pro
- Sonar Reasoning

## Company Overview

### OpenAI
- **Latest Models**: GPT-5 series, GPT-4.1 series, o3/o4 reasoning models
- **Strengths**: General-purpose capabilities, coding, reasoning
- **Notable**: First to market with many breakthrough capabilities

### Anthropic
- **Latest Models**: Claude Sonnet 4, Claude 3.7 Sonnet, Claude Opus 4
- **Strengths**: Safety, long context, constitutional AI
- **Notable**: Strong focus on AI safety and alignment

### Google
- **Latest Models**: Gemini 2.5 Pro, Gemini 2.5 Flash series
- **Strengths**: Multimodal capabilities, large context windows
- **Notable**: Largest context windows (1M tokens)

### DeepSeek
- **Latest Models**: DeepSeek R1, DeepSeek V3.1 series
- **Strengths**: Reasoning, cost-effectiveness, open research
- **Notable**: Strong performance at competitive pricing

### xAI
- **Latest Models**: Grok 4, Grok 3 series
- **Strengths**: Real-time information, image generation
- **Notable**: Integration with X platform for current events

### Meta
- **Latest Models**: Llama 4 series, Llama 3.3 70B, Llama 3.2 series
- **Strengths**: Open source, efficiency, vision capabilities
- **Notable**: Leading open-source model development, multimodal models

### Mistral
- **Latest Models**: Pixtral Large, Codestral, Magistral series
- **Strengths**: European AI, coding, multimodal
- **Notable**: Strong focus on code generation and European data sovereignty

### Cohere
- **Latest Models**: Command A, Command R+, Embed v4.0
- **Strengths**: Enterprise focus, embeddings, multilingual
- **Notable**: Strong enterprise and RAG capabilities

### Amazon Bedrock
- **Latest Models**: Nova Pro, Nova Lite, Nova Micro
- **Strengths**: AWS integration, cost-effective
- **Notable**: Tight integration with AWS ecosystem

## Cost Analysis

### Most Cost-Effective (Input Tokens)
1. Titan Text Embeddings V2: $0.02/M tokens
2. text-embedding-3-small: $0.02/M tokens
3. Text Embedding 005: $0.03/M tokens
4. Nova Micro: $0.04/M tokens
5. Ministral 3B: $0.04/M tokens

### Premium Models (Input Tokens)
1. Claude Opus 3/4/4.1, o1: $15/M tokens
2. GPT-4 Turbo: $10/M tokens
3. Grok 3 Fast Beta: $5/M tokens
4. Claude Sonnet 4, Grok 4: $3/M tokens

### Best Value for Performance
- DeepSeek V3.1: $0.20/M input, $0.80/M output
- Gemini 2.0 Flash: $0.15/M input, $0.60/M output
- GPT-4o mini: $0.15/M input, $0.60/M output

## Context Window Comparison

### Largest Context Windows
1. GPT-4.1 series, Llama 4 Maverick: 1,000,000 tokens
2. Gemini 2.0/2.5 series: 1,000,000 tokens
3. Nova Pro: 300,000 tokens

### Standard Context Windows
- Most models: 128,000 - 200,000 tokens
- Older models: 16,000 - 32,000 tokens

## Release Timeline

### 2025 Releases
- **August**: GPT-5 series, DeepSeek V3.1 Thinking
- **May**: Claude Sonnet 4, Claude Opus 4 series, DeepSeek R1
- **February**: Claude 3.7 Sonnet
- **January**: Gemini 2.5 series, GPT-4.1 series, Grok 4

### 2024 Releases
- **December**: o3 series, Llama 3.3 70B, Nova Pro
- **October**: Claude 3.5 Haiku, Kimi K2
- **August**: Grok 2
- **July**: GPT-4o mini, Llama 3.1 8B
- **June**: Claude 3.5 Sonnet

## Usage Recommendations

### For Coding Tasks
- Claude Opus 4 (premium)
- GPT-5 (balanced)
- DeepSeek V3.1 (cost-effective)

### For Reasoning Tasks
- Claude 3.7 Sonnet
- DeepSeek R1
- o3/o4 series

### For Image Generation
- GPT-4o series
- Gemini 2.5 Pro
- Grok 4

### For High-Volume Applications
- GPT-5 nano
- Gemini 2.0 Flash Lite
- Llama 3.1 8B

### For Long Documents
- Gemini 2.5 Pro (1M context)
- GPT-4.1 (1M context)
- Claude Sonnet 4 (200K context)

## Provider Support

### Multi-Provider Models
Many models are available through multiple providers for redundancy:
- **OpenAI models**: OpenAI, Azure
- **Anthropic models**: Anthropic, Bedrock, Vertex AI
- **Google models**: Google AI, Vertex AI
- **Meta models**: Meta, Bedrock, Cerebras, Groq

### Specialized Providers
- **Cerebras**: Ultra-fast inference
- **Groq**: High-speed processing
- **Fireworks**: Optimized serving
- **DeepInfra**: Cost-effective hosting
