export declare class CLIAnalyticsUtils {
    static track(event: string, props?: any): void;
    static trackSync(event: string, props?: any): Promise<void>;
    static identify(): void;
    /**
     * Show notice about telemetry
     */
    static showTelemetryMessage(): void;
}
