import * as fs from "fs/promises";
import * as path from "path";
import { MODEL_CONFIGS, validateApiKeys, createModelConfigs } from "./config";
import { generateWithModel } from "./models";
import { ComparisonResult } from "./types";
import { Logger } from "./logger";

export async function runAllModels(
  prompt: string,
  outputDir: string,
  modelsString?: string
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
  const { valid, invalid } = validateApiKeys();

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

  // Filter the model configs to only include valid ones
  const validModelConfigs = modelConfigs.filter((config) =>
    valid.some((validConfig) => validConfig.model === config.model)
  );

  console.log(
    `🔄 Running prompt through ${validModelConfigs.length} models...`
  );

  // Run all models concurrently
  const promises = validModelConfigs.map(async (config, index) => {
    console.log(
      `  ${index + 1}/${validModelConfigs.length} Starting ${config.name}...`
    );
    const result = await generateWithModel(config, prompt);

    if (result.error) {
      console.log(`  ❌ ${config.name} failed: ${result.error}`);
    } else {
      console.log(`  ✅ ${config.name} completed (${result.duration}ms)`);
    }

    return result;
  });

  const responses = await Promise.all(promises);

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
