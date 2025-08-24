import { generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { ModelConfig, ModelResponse } from "./types";

export async function generateWithModel(
  config: ModelConfig,
  prompt: string
): Promise<ModelResponse> {
  const startTime = Date.now();

  try {
    // Use the AI Gateway with the model string directly
    const { text } = await generateText({
      model: gateway(config.model),
      prompt: prompt,
      maxOutputTokens: 1000,
      temperature: 0.7,
    });

    const duration = Date.now() - startTime;

    return {
      modelName: config.name,
      provider: config.provider,
      model: config.model,
      prompt,
      response: text,
      timestamp: new Date().toISOString(),
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;

    return {
      modelName: config.name,
      provider: config.provider,
      model: config.model,
      prompt,
      response: "",
      timestamp: new Date().toISOString(),
      duration,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
