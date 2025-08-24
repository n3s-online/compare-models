# AI Model Comparison Tool

A TypeScript CLI tool that runs prompts through multiple AI models and compares their outputs. Built with the Vercel AI SDK V5 and AI Gateway.

## Features

- 🤖 **5 Popular AI Models**: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Grok 2, and Mistral Large
- 🌐 **Vercel AI Gateway**: Single API key for all providers with automatic failover
- ⚡ **Concurrent Processing**: Runs all models in parallel for faster results
- 📊 **JSON Output**: Structured results with metadata and performance metrics
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

## Usage

### Development Mode
```bash
pnpm run run-all --prompt "Your prompt here"
```

### Production Mode
```bash
# Build the project
pnpm run build

# Run the built version
pnpm start run-all --prompt "Your prompt here"
```

### Custom Output Directory
```bash
pnpm run run-all --prompt "Your prompt here" --output ./custom-output
```

## Example

```bash
pnpm run run-all --prompt "Explain quantum computing in simple terms"
```

This will:
1. Send the prompt to all configured models
2. Display progress in the terminal
3. Save results to `output/comparison-YYYY-MM-DDTHH-mm-ss-sssZ.json`

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
