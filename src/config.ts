import { ModelConfig } from "./types";

export const MODEL_CONFIGS: ModelConfig[] = [
  {
    name: "GPT-5",
    provider: "openai",
    model: "openai/gpt-5",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Claude Sonnet 4",
    provider: "anthropic",
    model: "anthropic/claude-sonnet-4",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "DeepSeek V3.1",
    provider: "deepseek",
    model: "deepseek/deepseek-v3.1",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Grok 4",
    provider: "xai",
    model: "xai/grok-4",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "google",
    model: "google/gemini-2.5-pro",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Meta Llama 3.3 70B",
    provider: "meta",
    model: "meta/llama-3.3-70b",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
];

export function validateApiKeys(): {
  valid: ModelConfig[];
  invalid: ModelConfig[];
} {
  const apiKey = process.env.AI_GATEWAY_API_KEY;

  if (apiKey && apiKey.trim() !== "") {
    // All models are valid if we have the gateway API key
    return { valid: MODEL_CONFIGS, invalid: [] };
  } else {
    // No models are valid without the gateway API key
    return { valid: [], invalid: MODEL_CONFIGS };
  }
}
