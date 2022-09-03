import { ExportPodConfigurationV2, PodV2Types } from "..";
export declare class PodV2ConfigManager {
    /**
     * Get a pod config by its ID. The returned value will also have its
     * connection props in its return value
     * @param param0
     * @returns pod config if it exists, otherwise undefined
     */
    static getPodConfigById<T extends ExportPodConfigurationV2>({ podsDir, opts, }: {
        podsDir: string;
        opts: Pick<ExportPodConfigurationV2, "podId">;
    }): T | undefined;
    /**
     * Retrieve all valid pod configs in the specified directory
     * @param podsDir
     * @returns
     */
    static getAllPodConfigs(podsDir: string): ExportPodConfigurationV2[];
    private static getConfigFiles;
    /**
     * Get all persisted configs for a particular type of pod
     * @param type
     * @returns
     */
    static getAllConfigsByType(opts: {
        type: PodV2Types;
        podsDir: string;
    }): Promise<ExportPodConfigurationV2[]>;
}
