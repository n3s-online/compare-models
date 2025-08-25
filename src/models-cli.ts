import { Command } from "commander";
import {
  getAllModelsData,
  getModelsByCompany,
  getModelsByTier,
  getImageGenerationModels,
  getReasoningModels,
  getModelsByProvider,
  getModelsSortedByCost,
  getModelsSortedByContext,
  getModelsReleasedAfter,
  getModelsByYear,
  searchModelsByName,
  getModelStatistics,
  getModelMetadata,
} from "./models-utils";

export function addModelsCommands(program: Command) {
  const modelsCommand = program
    .command("models")
    .description("Explore and analyze AI models data");

  // List all models
  modelsCommand
    .command("list")
    .description("List all available models")
    .option("-c, --company <company>", "Filter by company")
    .option("-t, --tier <tier>", "Filter by tier (small/normal/large)")
    .option("-p, --provider <provider>", "Filter by provider")
    .option("--images", "Show only models that can generate images")
    .option("--reasoning", "Show only models with reasoning capabilities")
    .option(
      "--text-chat",
      "Show only text/chat models (exclude embedding models)"
    )
    .option("--embedding", "Show only embedding models")
    .option("--json", "Output as JSON")
    .option("--csv", "Output as comma-separated identifiers")
    .action((options) => {
      let models = getAllModelsData();

      // Apply filters
      if (options.company) {
        models = getModelsByCompany(options.company);
      }
      if (options.tier) {
        models = getModelsByTier(options.tier as "small" | "normal" | "large");
      }
      if (options.provider) {
        models = getModelsByProvider(options.provider);
      }
      if (options.images) {
        models = models.filter((m) => m.canGenerateImage);
      }
      if (options.reasoning) {
        models = models.filter((m) => m.hasReasoning);
      }
      if (options.textChat) {
        models = models.filter((m) => m.textOrChatModel);
      }
      if (options.embedding) {
        models = models.filter((m) => !m.textOrChatModel);
      }

      if (options.json) {
        console.log(JSON.stringify(models, null, 2));
      } else if (options.csv) {
        const identifiers = models.map((m) => m.modelIdentifier);
        console.log(identifiers.join(","));
      } else {
        console.log(`\n📊 Found ${models.length} models:\n`);
        models.forEach((model, index) => {
          const capabilities = [];
          if (model.canGenerateImage) capabilities.push("🖼️  Images");
          if (model.hasReasoning) capabilities.push("🧠 Reasoning");
          if (!model.textOrChatModel) capabilities.push("🔗 Embedding");

          console.log(`${index + 1}. ${model.modelName} (${model.company})`);
          console.log(`   ID: ${model.modelIdentifier}`);
          console.log(
            `   Tier: ${model.tier} | Context: ${
              model.context?.toLocaleString() || "N/A"
            } tokens`
          );
          console.log(
            `   Cost: $${model.usdCostPerMillionInputTokens}/M in, $${
              model.usdCostPerMillionOutputTokens || "N/A"
            }/M out`
          );
          console.log(`   Released: ${model.releaseDate}`);
          if (capabilities.length > 0) {
            console.log(`   Capabilities: ${capabilities.join(", ")}`);
          }
          console.log(`   Providers: ${model.providers.join(", ")}`);
          console.log();
        });
      }
    });

  // Show model details
  modelsCommand
    .command("info <modelIdentifier>")
    .description("Show detailed information about a specific model")
    .action((modelIdentifier) => {
      const model = getModelMetadata(modelIdentifier);
      if (!model) {
        console.error(`❌ Model not found: ${modelIdentifier}`);
        process.exit(1);
      }

      console.log(`\n📋 ${model.modelName} Details\n`);
      console.log(`Company: ${model.company}`);
      console.log(`Identifier: ${model.modelIdentifier}`);
      console.log(`Release Date: ${model.releaseDate}`);
      console.log(`Tier: ${model.tier}`);
      console.log(
        `Context Window: ${model.context?.toLocaleString() || "N/A"} tokens`
      );
      console.log(
        `Input Cost: $${model.usdCostPerMillionInputTokens} per million tokens`
      );
      console.log(
        `Output Cost: $${
          model.usdCostPerMillionOutputTokens || "N/A"
        } per million tokens`
      );
      console.log(
        `Image Generation: ${model.canGenerateImage ? "✅ Yes" : "❌ No"}`
      );
      console.log(`Reasoning: ${model.hasReasoning ? "✅ Yes" : "❌ No"}`);
      console.log(`Providers: ${model.providers.join(", ")}`);
      console.log();
    });

  // Search models
  modelsCommand
    .command("search <term>")
    .description("Search models by name or identifier")
    .action((term) => {
      const models = searchModelsByName(term);
      if (models.length === 0) {
        console.log(`❌ No models found matching: ${term}`);
        return;
      }

      console.log(`\n🔍 Found ${models.length} models matching "${term}":\n`);
      models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.modelName} (${model.company})`);
        console.log(`   ID: ${model.modelIdentifier}`);
        console.log(`   Cost: $${model.usdCostPerMillionInputTokens}/M in`);
        console.log();
      });
    });

  // Show statistics
  modelsCommand
    .command("stats")
    .description("Show statistics about all models")
    .action(() => {
      const stats = getModelStatistics();

      console.log("\n📊 Model Statistics\n");
      console.log(`Total Models: ${stats.totalModels}`);
      console.log(
        `Models with Image Generation: ${stats.imageGenerationCount}`
      );
      console.log(`Models with Reasoning: ${stats.reasoningCount}`);
      console.log(`Average Input Cost: $${stats.avgInputCost}/M tokens`);
      console.log(`Average Output Cost: $${stats.avgOutputCost}/M tokens`);

      console.log("\n🏢 Models by Company:");
      Object.entries(stats.companyCounts)
        .sort(([, a], [, b]) => b - a)
        .forEach(([company, count]) => {
          console.log(`  ${company}: ${count} models`);
        });

      console.log("\n📏 Models by Tier:");
      Object.entries(stats.tierCounts).forEach(([tier, count]) => {
        console.log(`  ${tier}: ${count} models`);
      });
      console.log();
    });

  // Sort models by cost
  modelsCommand
    .command("cost")
    .description("Show models sorted by cost")
    .option("--desc", "Sort in descending order (most expensive first)")
    .action((options) => {
      const models = getModelsSortedByCost(!options.desc);

      console.log(
        `\n💰 Models sorted by cost (${
          options.desc ? "most to least" : "least to most"
        } expensive):\n`
      );
      models.forEach((model, index) => {
        console.log(
          `${index + 1}. ${model.modelName} - $${
            model.usdCostPerMillionInputTokens
          }/M input tokens`
        );
      });
      console.log();
    });

  // Sort models by context
  modelsCommand
    .command("context")
    .description("Show models sorted by context window size")
    .option("--asc", "Sort in ascending order (smallest first)")
    .action((options) => {
      const models = getModelsSortedByContext(options.asc);

      console.log(
        `\n📏 Models sorted by context window (${
          options.asc ? "smallest to largest" : "largest to smallest"
        }):\n`
      );
      models.forEach((model, index) => {
        console.log(
          `${index + 1}. ${
            model.modelName
          } - ${model.context?.toLocaleString()} tokens`
        );
      });
      console.log();
    });

  // Show models by year
  modelsCommand
    .command("year <year>")
    .description("Show models released in a specific year")
    .action((year) => {
      const models = getModelsByYear(parseInt(year));
      if (models.length === 0) {
        console.log(`❌ No models found for year: ${year}`);
        return;
      }

      console.log(
        `\n📅 Models released in ${year} (${models.length} total):\n`
      );
      models
        .sort(
          (a, b) =>
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
        )
        .forEach((model, index) => {
          console.log(
            `${index + 1}. ${model.modelName} (${model.company}) - ${
              model.releaseDate
            }`
          );
        });
      console.log();
    });

  return modelsCommand;
}
