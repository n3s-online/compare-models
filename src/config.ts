import { ModelConfig } from './types';

export const MODEL_CONFIGS: ModelConfig[] = [
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    model: 'gpt-4o',
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    model: 'claude-3-5-sonnet-20241022',
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  },
  {
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    model: 'gemini-1.5-pro-latest',
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
  },
  {
    name: 'Grok 2',
    provider: 'xAI',
    model: 'grok-2-1212',
    apiKey: process.env.XAI_API_KEY || '',
  },
  {
    name: 'Mistral Large',
    provider: 'Mistral',
    model: 'mistral-large-latest',
    apiKey: process.env.MISTRAL_API_KEY || '',
  },
];

export function validateApiKeys(): { valid: ModelConfig[]; invalid: ModelConfig[] } {
  const valid: ModelConfig[] = [];
  const invalid: ModelConfig[] = [];

  MODEL_CONFIGS.forEach(config => {
    if (config.apiKey && config.apiKey.trim() !== '') {
      valid.push(config);
    } else {
      invalid.push(config);
    }
  });

  return { valid, invalid };
}
