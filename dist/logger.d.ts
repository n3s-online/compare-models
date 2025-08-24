export declare class Logger {
    private static instance;
    private constructor();
    static getInstance(): Logger;
    info(message: string, ...args: any[]): void;
    success(message: string, ...args: any[]): void;
    warning(message: string, ...args: any[]): void;
    error(message: string, error?: Error | string, ...args: any[]): void;
    progress(current: number, total: number, message: string): void;
    summary(message: string, ...args: any[]): void;
    file(message: string, ...args: any[]): void;
    time(message: string, ...args: any[]): void;
}
//# sourceMappingURL=logger.d.ts.map