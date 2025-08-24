"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWithModel = generateWithModel;
const ai_1 = require("ai");
const openai_1 = require("@ai-sdk/openai");
const anthropic_1 = require("@ai-sdk/anthropic");
const google_1 = require("@ai-sdk/google");
const xai_1 = require("@ai-sdk/xai");
const mistral_1 = require("@ai-sdk/mistral");
const logger_1 = require("./logger");
async function generateWithModel(config, prompt) {
    const logger = logger_1.Logger.getInstance();
    const startTime = Date.now();
    try {
        let model;
        switch (config.provider) {
            case "OpenAI":
                const openaiProvider = (0, openai_1.createOpenAI)({ apiKey: config.apiKey });
                model = openaiProvider(config.model);
                break;
            case "Anthropic":
                const anthropicProvider = (0, anthropic_1.createAnthropic)({ apiKey: config.apiKey });
                model = anthropicProvider(config.model);
                break;
            case "Google":
                const googleProvider = (0, google_1.createGoogleGenerativeAI)({
                    apiKey: config.apiKey,
                });
                model = googleProvider(config.model);
                break;
            case "xAI":
                const xaiProvider = (0, xai_1.createXai)({ apiKey: config.apiKey });
                model = xaiProvider(config.model);
                break;
            case "Mistral":
                const mistralProvider = (0, mistral_1.createMistral)({ apiKey: config.apiKey });
                model = mistralProvider(config.model);
                break;
            default:
                throw new Error(`Unknown provider: ${config.provider}`);
        }
        const { text } = await (0, ai_1.generateText)({
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
    }
    catch (error) {
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
//# sourceMappingURL=models.js.map