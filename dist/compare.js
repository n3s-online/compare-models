"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllModels = runAllModels;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const config_1 = require("./config");
const models_1 = require("./models");
const logger_1 = require("./logger");
async function runAllModels(prompt, outputDir) {
    const logger = logger_1.Logger.getInstance();
    // Validate API keys
    const { valid, invalid } = (0, config_1.validateApiKeys)();
    if (invalid.length > 0) {
        console.warn("⚠️  Missing API keys for:", invalid.map((c) => c.name).join(", "));
        console.warn("These models will be skipped. Set the following environment variables:");
        invalid.forEach((config) => {
            const envVar = getEnvVarName(config.provider);
            console.warn(`  - ${envVar} for ${config.name}`);
        });
    }
    if (valid.length === 0) {
        throw new Error("No valid API keys found. Please set at least one API key.");
    }
    console.log(`🔄 Running prompt through ${valid.length} models...`);
    // Run all models concurrently
    const promises = valid.map(async (config, index) => {
        console.log(`  ${index + 1}/${valid.length} Starting ${config.name}...`);
        const result = await (0, models_1.generateWithModel)(config, prompt);
        if (result.error) {
            console.log(`  ❌ ${config.name} failed: ${result.error}`);
        }
        else {
            console.log(`  ✅ ${config.name} completed (${result.duration}ms)`);
        }
        return result;
    });
    const responses = await Promise.all(promises);
    // Create comparison result
    const result = {
        prompt,
        timestamp: new Date().toISOString(),
        models: responses,
        summary: {
            totalModels: responses.length,
            successfulResponses: responses.filter((r) => !r.error).length,
            failedResponses: responses.filter((r) => r.error).length,
            averageDuration: responses.reduce((sum, r) => sum + r.duration, 0) / responses.length,
        },
    };
    // Save to JSON file
    await saveResults(result, outputDir);
}
async function saveResults(result, outputDir) {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `comparison-${timestamp}.json`;
    const filepath = path.join(outputDir, filename);
    // Write JSON file
    await fs.writeFile(filepath, JSON.stringify(result, null, 2), "utf-8");
    console.log(`📄 Results saved to: ${filepath}`);
    console.log(`📊 Summary: ${result.summary.successfulResponses}/${result.summary.totalModels} models succeeded`);
    console.log(`⏱️  Average response time: ${Math.round(result.summary.averageDuration)}ms`);
}
function getEnvVarName(provider) {
    switch (provider) {
        case "OpenAI":
            return "OPENAI_API_KEY";
        case "Anthropic":
            return "ANTHROPIC_API_KEY";
        case "Google":
            return "GOOGLE_GENERATIVE_AI_API_KEY";
        case "xAI":
            return "XAI_API_KEY";
        case "Mistral":
            return "MISTRAL_API_KEY";
        default:
            return `${provider.toUpperCase()}_API_KEY`;
    }
}
//# sourceMappingURL=compare.js.map