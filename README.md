# AI Model Comparison Tool

A TypeScript CLI tool that runs prompts through multiple AI models and compares their outputs. Built with the Vercel AI SDK V5.

## Features

- 🤖 **5 Popular AI Models**: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Grok 2, and Mistral Large
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

## API Keys Setup

You need at least one API key to use the tool. Set the following environment variables:

- `OPENAI_API_KEY` - OpenAI API key for GPT-4o
- `ANTHROPIC_API_KEY` - Anthropic API key for Claude 3.5 Sonnet
- `GOOGLE_GENERATIVE_AI_API_KEY` - Google API key for Gemini 1.5 Pro
- `XAI_API_KEY` - xAI API key for Grok 2
- `MISTRAL_API_KEY` - Mistral API key for Mistral Large

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
