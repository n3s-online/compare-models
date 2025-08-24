import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createXai } from "@ai-sdk/xai";
import { createMistral } from "@ai-sdk/mistral";
import { ModelConfig, ModelResponse } from "./types";
import { Logger } from "./logger";

export async function generateWithModel(
  config: ModelConfig,
  prompt: string
): Promise<ModelResponse> {
  const logger = Logger.getInstance();
  const startTime = Date.now();

  try {
    let model;

    switch (config.provider) {
      case "OpenAI":
        const openaiProvider = createOpenAI({ apiKey: config.apiKey });
        model = openaiProvider(config.model);
        break;
      case "Anthropic":
        const anthropicProvider = createAnthropic({ apiKey: config.apiKey });
        model = anthropicProvider(config.model);
        break;
      case "Google":
        const googleProvider = createGoogleGenerativeAI({
          apiKey: config.apiKey,
        });
        model = googleProvider(config.model);
        break;
      case "xAI":
        const xaiProvider = createXai({ apiKey: config.apiKey });
        model = xaiProvider(config.model);
        break;
      case "Mistral":
        const mistralProvider = createMistral({ apiKey: config.apiKey });
        model = mistralProvider(config.model);
        break;
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }

    const { text } = await generateText({
      model: model,
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
