import * as fs from "fs/promises";
import * as path from "path";
import { MODEL_CONFIGS, validateApiKeys, createModelConfigs } from "./config";
import { generateWithModel } from "./models";
import { ComparisonResult, ModelResponse } from "./types";
import { Logger } from "./logger";
import { generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";

/**
 * Clean up response using GPT-3.5-turbo to remove thinking or formatting
 */
async function cleanupResponse({
  originalPrompt,
  response,
}: {
  originalPrompt: string;
  response: string;
}): Promise<string> {
  try {
    const cleanupPrompt = `Please clean up the following AI response by removing any thinking, reasoning steps, formatting markers, or meta-commentary. Note that the original prompt was '${originalPrompt}' Return only the core content/answer:

${response}`;

    const { text } = await generateText({
      model: gateway("openai/gpt-3.5-turbo"),
      prompt: cleanupPrompt,
      maxOutputTokens: 1000,
      temperature: 0.1,
    });

    return text.trim();
  } catch (error) {
    console.log(
      `  ⚠️  Cleanup failed, using original response: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return response;
  }
}

/**
 * Add delay between requests
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runAllModels(
  prompt: string,
  outputDir: string,
  modelsString?: string,
  delayMs: number = 4000,
  enableCleanup: boolean = true
): Promise<void> {
  const logger = Logger.getInstance();

  // Determine which models to use
  let modelConfigs;
  if (modelsString) {
    const modelIdentifiers = modelsString.split(",").map((id) => id.trim());
    console.log(`🎯 Using specified models: ${modelIdentifiers.join(", ")}`);
    try {
      modelConfigs = createModelConfigs(modelIdentifiers);
    } catch (error) {
      throw new Error(
        `Invalid model identifier: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  } else {
    modelConfigs = MODEL_CONFIGS;
    console.log(`🎯 Using default models`);
  }

  // Validate API keys
  const { valid, invalid } = validateApiKeys(modelConfigs);

  if (invalid.length > 0) {
    logger.warning("Missing AI Gateway API key");
    logger.warning(
      "Please set the AI_GATEWAY_API_KEY environment variable to use all models"
    );
  }

  if (valid.length === 0) {
    throw new Error(
      "No AI Gateway API key found. Please set the AI_GATEWAY_API_KEY environment variable."
    );
  }

  console.log(`🔄 Running prompt through ${valid.length} models...`);

  // Process models in batches of 5
  const batchSize = 5;
  const batches = [];
  for (let i = 0; i < valid.length; i += batchSize) {
    batches.push(valid.slice(i, i + batchSize));
  }

  console.log(
    `📦 Processing ${batches.length} batches of up to ${batchSize} models each (4-second delays between batches)`
  );

  const allResponses: ModelResponse[] = [];

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(
      `\n🔄 Processing batch ${batchIndex + 1}/${batches.length} (${
        batch.length
      } models)...`
    );

    // Add delay before each batch (except the first one)
    if (batchIndex > 0 && delayMs > 0) {
      console.log(`  ⏳ Waiting ${delayMs}ms before next batch...`);
      await delay(delayMs);
    }

    // Run all models in the current batch concurrently
    const batchPromises = batch.map(async (config, index) => {
      const globalIndex = batchIndex * batchSize + index + 1;
      console.log(
        `  ${globalIndex}/${valid.length} Starting ${config.name}...`
      );

      const result = await generateWithModel(config, prompt);

      if (result.error) {
        console.log(`  ❌ ${config.name} failed: ${result.error}`);
      } else {
        console.log(`  ✅ ${config.name} completed (${result.duration}ms)`);
      }

      return result;
    });

    const batchResponses = await Promise.all(batchPromises);

    // Clean up successful responses in batch if cleanup is enabled
    if (enableCleanup) {
      const successfulResponses = batchResponses.filter((r) => !r.error);
      if (successfulResponses.length > 0) {
        console.log(
          `  🧹 Cleaning up ${
            successfulResponses.length
          } responses from batch ${batchIndex + 1}...`
        );

        const cleanupPromises = successfulResponses.map(async (result) => {
          const cleanedResponse = await cleanupResponse({
            originalPrompt: prompt,
            response: result.response,
          });

          return {
            ...result,
            response: cleanedResponse,
          };
        });

        const cleanedResponses = await Promise.all(cleanupPromises);
        console.log(
          `  ✨ Batch ${batchIndex + 1} responses cleaned and stored`
        );

        // Replace successful responses with cleaned versions
        const cleanedMap = new Map(
          cleanedResponses.map((r) => [r.modelName, r])
        );
        const finalBatchResponses = batchResponses.map((r) =>
          r.error ? r : cleanedMap.get(r.modelName) || r
        );

        allResponses.push(...finalBatchResponses);
      } else {
        allResponses.push(...batchResponses);
      }
    } else {
      allResponses.push(...batchResponses);
    }
  }

  const responses = allResponses;

  // Create comparison result
  const result: ComparisonResult = {
    prompt,
    timestamp: new Date().toISOString(),
    models: responses,
    summary: {
      totalModels: responses.length,
      successfulResponses: responses.filter((r) => !r.error).length,
      failedResponses: responses.filter((r) => r.error).length,
      averageDuration:
        responses.reduce((sum, r) => sum + r.duration, 0) / responses.length,
    },
  };

  // Save to JSON file
  await saveResults(result, outputDir);
}

async function saveResults(
  result: ComparisonResult,
  outputDir: string
): Promise<void> {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `comparison-${timestamp}.json`;
  const filepath = path.join(outputDir, filename);

  // Write JSON file
  await fs.writeFile(filepath, JSON.stringify(result, null, 2), "utf-8");

  console.log(`📄 Results saved to: ${filepath}`);
  console.log(
    `📊 Summary: ${result.summary.successfulResponses}/${result.summary.totalModels} models succeeded`
  );
  console.log(
    `⏱️  Average response time: ${Math.round(result.summary.averageDuration)}ms`
  );
}
