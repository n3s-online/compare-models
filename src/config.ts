import { ModelConfig } from "./types";
import { MODELS_DATA } from "./models-data";

// Default models for comparison (can be customized)
export const DEFAULT_COMPARISON_MODELS = [
  "gpt-5",
  "claude-sonnet-4",
  "deepseek-v3.1",
  "grok-4",
  "gemini-2.5-pro",
  "llama-3.3-70b",
];

/**
 * Generate model configs from model identifiers
 */
export function createModelConfigs(modelIdentifiers: string[]): ModelConfig[] {
  return modelIdentifiers.map((identifier) => {
    const modelData = MODELS_DATA.find((m) => m.modelIdentifier === identifier);
    if (!modelData) {
      throw new Error(`Model not found: ${identifier}`);
    }

    // Use the first provider as default
    const primaryProvider = modelData.providers[0];

    return {
      name: modelData.modelName,
      provider: primaryProvider,
      model: `${primaryProvider}/${identifier}`,
      apiKey: process.env.AI_GATEWAY_API_KEY || "",
    };
  });
}

// Generate default model configs
export const MODEL_CONFIGS: ModelConfig[] = createModelConfigs(
  DEFAULT_COMPARISON_MODELS
);

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
