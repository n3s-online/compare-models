export class Logger {
  private static instance: Logger;
  
  private constructor() {}
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string, ...args: any[]): void {
    console.log(`ℹ️  ${message}`, ...args);
  }

  success(message: string, ...args: any[]): void {
    console.log(`✅ ${message}`, ...args);
  }

  warning(message: string, ...args: any[]): void {
    console.warn(`⚠️  ${message}`, ...args);
  }

  error(message: string, error?: Error | string, ...args: any[]): void {
    console.error(`❌ ${message}`, error || '', ...args);
  }

  progress(current: number, total: number, message: string): void {
    console.log(`🔄 [${current}/${total}] ${message}`);
  }

  summary(message: string, ...args: any[]): void {
    console.log(`📊 ${message}`, ...args);
  }

  file(message: string, ...args: any[]): void {
    console.log(`📄 ${message}`, ...args);
  }

  time(message: string, ...args: any[]): void {
    console.log(`⏱️  ${message}`, ...args);
  }
}
