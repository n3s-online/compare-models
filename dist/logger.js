"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static instance;
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    info(message, ...args) {
        console.log(`ℹ️  ${message}`, ...args);
    }
    success(message, ...args) {
        console.log(`✅ ${message}`, ...args);
    }
    warning(message, ...args) {
        console.warn(`⚠️  ${message}`, ...args);
    }
    error(message, error, ...args) {
        console.error(`❌ ${message}`, error || '', ...args);
    }
    progress(current, total, message) {
        console.log(`🔄 [${current}/${total}] ${message}`);
    }
    summary(message, ...args) {
        console.log(`📊 ${message}`, ...args);
    }
    file(message, ...args) {
        console.log(`📄 ${message}`, ...args);
    }
    time(message, ...args) {
        console.log(`⏱️  ${message}`, ...args);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map