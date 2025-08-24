import { ModelConfig } from "./types";

export const MODEL_CONFIGS: ModelConfig[] = [
  {
    name: "GPT-4o",
    provider: "openai",
    model: "openai/gpt-4o",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    model: "anthropic/claude-3-5-sonnet-20241022",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "google",
    model: "google/gemini-1.5-pro",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Grok 2",
    provider: "xai",
    model: "xai/grok-2-1212",
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  },
  {
    name: "Mistral Large",
    provider: "mistral",
    model: "mistral/mistral-large-latest",
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
