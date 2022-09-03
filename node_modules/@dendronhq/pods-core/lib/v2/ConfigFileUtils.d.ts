import { PodV2Types } from "..";
export declare class ConfigFileUtils {
    static getConfigByFPath({ fPath }: {
        fPath: string;
    }): any;
    /**
     * Create config file if it doesn't exist
     */
    static genConfigFileV2<T>({ fPath, configSchema, force, setProperties, }: {
        fPath: string;
        configSchema: any;
        force?: boolean;
        setProperties?: Partial<T>;
    }): string;
    static createExportConfig<T>(opts: {
        required: (keyof T)[];
        properties: T;
    }): {
        type: string;
        required: (string | keyof T)[];
        properties: {
            podId: {
                description: string;
                type: string;
            };
            description: {
                description: string;
                type: string;
                nullable: boolean;
            };
            exportScope: {
                description: string;
                type: string;
                note: string;
            };
            podType: {
                description: string;
                type: string;
            };
        } & T;
    };
    static getConfigSchema(podType: PodV2Types): any;
}
