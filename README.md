# AI Model Comparison Tool

A TypeScript CLI tool that runs prompts through multiple AI models and compares their outputs. Built with the Vercel AI SDK V5 and AI Gateway.

## Features

- 🤖 **110+ AI Models**: Comprehensive support for latest models from OpenAI, Anthropic, Google, DeepSeek, xAI, Meta, Mistral, Cohere, and more
- 🌐 **Vercel AI Gateway**: Single API key for all providers with automatic failover
- ⚡ **Concurrent Processing**: Runs all models in parallel for faster results
- 📊 **Rich Metadata**: Detailed model information including costs, capabilities, and release dates
- 🔍 **Model Explorer**: CLI commands to search, filter, and analyze models
- 🧠 **Advanced Capabilities**: Support for reasoning models and image generation
- 📈 **Cost Analysis**: Compare pricing across different models and providers
- 🔧 **TypeScript**: Full type safety and modern development experience
- 🛡️ **Error Handling**: Graceful handling of API failures and missing keys
- 📝 **Detailed Logging**: Progress tracking and informative output

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd compare-models
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

## API Key Setup

You need a single Vercel AI Gateway API key to access all models:

1. Sign up for a [Vercel account](https://vercel.com) if you don't have one
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
3. Navigate to the AI Gateway section
4. Create an API key
5. Set the environment variable: `AI_GATEWAY_API_KEY`

The AI Gateway provides access to all supported models through a single API key with automatic failover and load balancing.

## Supported Models

This tool supports 110+ AI models from major providers:

### OpenAI Models
- **GPT-5 Series**: GPT-5, GPT-5 mini, GPT-5 nano
- **GPT-4.1 Series**: GPT-4.1, GPT-4.1 mini, GPT-4.1 nano
- **GPT-4o Series**: GPT-4o, GPT-4o mini (with image generation)
- **Reasoning Models**: o3, o3-mini, o4-mini
- **Open Source**: gpt-oss-120b, gpt-oss-20b
- **Embeddings**: text-embedding-3-small, text-embedding-3-large

### Anthropic Models
- **Claude 4 Series**: Claude Sonnet 4, Claude Opus 4, Claude Opus 4.1
- **Claude 3.7**: Claude 3.7 Sonnet (hybrid reasoning)
- **Claude 3.5**: Claude 3.5 Sonnet, Claude 3.5 Haiku
- **Claude 3**: Claude 3 Haiku

### Google Models
- **Gemini 2.5**: Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash Lite
- **Gemini 2.0**: Gemini 2.0 Flash, Gemini 2.0 Flash Lite

### DeepSeek Models
- **Reasoning**: DeepSeek R1, DeepSeek V3.1 Thinking
- **General**: DeepSeek V3.1, DeepSeek R1 Distill Llama 70B

### xAI Models
- **Grok 4**: Latest with image generation
- **Grok 3**: Grok 3 Beta, Grok 3 Mini Beta, Grok 3 Fast Beta
- **Grok 2**: Multimodal capabilities

### Meta Models
- **Llama 4**: Llama 4 Scout, Llama 4 Maverick 17B
- **Llama 3**: Llama 3.3 70B, Llama 3.1 8B

### Mistral Models
- **Pixtral Series**: Pixtral Large, Pixtral 12B (multimodal)
- **Codestral**: Codestral 25.01, Codestral Embed
- **Magistral Series**: Magistral Medium, Magistral Small
- **Ministral Series**: Ministral 8B, Ministral 3B
- **Classic**: Mistral Large, Mistral Medium, Mistral Small
- **Specialized**: Devstral Small, Mistral Saba 24B, Mixtral 8x22B

### Cohere Models
- **Command Series**: Command A, Command R+, Command R
- **Embeddings**: Embed v4.0

### Amazon Bedrock Models
- **Nova Series**: Nova Pro (multimodal), Nova Lite, Nova Micro
- **Titan**: Titan Text Embeddings V2

### Other Notable Models
- **Alibaba**: Qwen3 series (Coder, 235B, 30B, 14B, 32B)
- **Perplexity**: Sonar, Sonar Pro, Sonar Reasoning, Sonar Reasoning Pro
- **Moonshot AI**: Kimi K2
- **Z.ai**: GLM 4.5, GLM 4.5 Air, GLM 4.5V (multimodal)
- **Vercel**: v0-1.5-md, v0-1.0-md
- **Morph**: Morph V3 Fast, Morph V3 Large
- **Inception**: Mercury Coder Small Beta

For detailed information about each model including pricing, capabilities, and release dates, see the [Models Reference](docs/models-reference.md) or use the CLI exploration commands.

## Quick Reference

### Popular Model Combinations

```bash
# Latest flagship models
--models "gpt-5,claude-sonnet-4,gemini-2.5-pro,grok-4"

# Best reasoning models
--models "claude-3.7-sonnet,deepseek-r1,o3,sonar-reasoning"

# Cost-effective options
--models "gpt-5-nano,ministral-3b,llama-3.1-8b,nova-micro"

# Image generation capable
--models "gpt-4o,gemini-2.5-pro,grok-4,pixtral-large"

# Coding specialists
--models "claude-opus-4,codestral,deepseek-v3.1,gpt-5"
```

### Command Shortcuts

```bash
# Get model lists for specific use cases
pnpm run dev models list --tier "large" --csv          # Large models
pnpm run dev models list --company "Anthropic" --csv   # Anthropic models
pnpm run dev models list --reasoning --csv              # Reasoning models
pnpm run dev models list --images --csv                 # Image generation models
pnpm run dev models list --text-chat --csv              # Text/chat models (exclude embeddings)
pnpm run dev models list --embedding --csv              # Embedding models only

# Quick model info
pnpm run dev models info gpt-5                         # Detailed model info
pnpm run dev models search "claude"                    # Search by name
pnpm run dev models cost                               # Sort by cost
```

## Usage

### Model Comparison

#### Development Mode
```bash
# Run with default models
pnpm run run-all --prompt "Your prompt here"

# Run with specific models
pnpm run run-all --prompt "Your prompt here" --models "gpt-5,claude-sonnet-4,gemini-2.5-pro"
```

#### Production Mode
```bash
# Build the project
pnpm run build

# Run the built version with default models
pnpm start run-all --prompt "Your prompt here"

# Run with specific models
pnpm start run-all --prompt "Your prompt here" --models "gpt-5,claude-sonnet-4"
```

#### Custom Output Directory
```bash
pnpm run run-all --prompt "Your prompt here" --output ./custom-output
```

### Model Exploration

#### List All Models
```bash
# List all available models
pnpm run dev models list

# Filter by company
pnpm run dev models list --company "OpenAI"

# Filter by tier
pnpm run dev models list --tier "large"

# Show only reasoning models
pnpm run dev models list --reasoning

# Show only image generation models
pnpm run dev models list --images

# Get comma-separated list of model identifiers (for use with --models)
pnpm run dev models list --csv
pnpm run dev models list --company "OpenAI" --csv
```

#### Model Information
```bash
# Get detailed info about a specific model
pnpm run dev models info gpt-5

# Search models by name
pnpm run dev models search "claude"

# Show models by release year
pnpm run dev models year 2025
```

#### Cost and Performance Analysis
```bash
# Show models sorted by cost
pnpm run dev models cost

# Show models sorted by context window
pnpm run dev models context

# Show overall statistics
pnpm run dev models stats
```

## Examples

### Basic Usage
```bash
pnpm run run-all --prompt "Explain quantum computing in simple terms"
```

### Using Specific Models
```bash
# Compare reasoning models
pnpm run run-all --prompt "Solve this logic puzzle" --models "claude-3.7-sonnet,deepseek-r1,o3"

# Compare image generation models
pnpm run run-all --prompt "Generate an image of a sunset" --models "gpt-4o,gemini-2.5-pro,grok-4"

# Compare cost-effective models
pnpm run run-all --prompt "Write a simple function" --models "gpt-5-nano,ministral-3b,llama-3.1-8b"
```

### Using CSV Output to Build Model Lists
```bash
# Get all OpenAI models and use them
OPENAI_MODELS=$(pnpm run dev models list --company "OpenAI" --csv)
pnpm run run-all --prompt "Your prompt" --models "$OPENAI_MODELS"

# Get all reasoning models
REASONING_MODELS=$(pnpm run dev models list --reasoning --csv)
pnpm run run-all --prompt "Complex reasoning task" --models "$REASONING_MODELS"
```

This will:
1. Send the prompt to the specified models (or all configured models if none specified)
2. Display progress in the terminal
3. Save results to `output/comparison-YYYY-MM-DDTHH-mm-ss-sssZ.json`

### Converting Results to Text Format

Convert JSON comparison results to a readable text format:

```bash
# Convert most recent comparison to text
pnpm run convert

# Convert specific file
pnpm run convert -i output/comparison-2025-08-25T03-35-37-348Z.json

# Convert with custom output filename
pnpm run convert -i input.json -o output.txt
```

The text format includes:
- The original prompt
- Each model's response (or error message)
- Summary statistics

## Output Format

The tool generates JSON files with the following structure:

```json
{
  "prompt": "Your original prompt",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "models": [
    {
      "modelName": "GPT-4o",
      "provider": "OpenAI",
      "model": "gpt-4o",
      "prompt": "Your original prompt",
      "response": "Model's response...",
      "timestamp": "2024-01-01T12:00:00.000Z",
      "duration": 1500,
      "error": null
    }
  ],
  "summary": {
    "totalModels": 5,
    "successfulResponses": 4,
    "failedResponses": 1,
    "averageDuration": 1200
  }
}
```

## Development

### Available Scripts

- `pnpm run build` - Build the TypeScript project
- `pnpm run dev` - Run in development mode with ts-node
- `pnpm run start` - Run the built version
- `pnpm run run-all` - Shortcut for running the comparison
- `pnpm run clean` - Remove build artifacts

### Project Structure

```
src/
├── cli.ts          # CLI interface and commands
├── compare.ts      # Main comparison logic
├── models.ts       # AI model integrations
├── config.ts       # Model configurations
├── types.ts        # TypeScript interfaces
└── logger.ts       # Logging utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
