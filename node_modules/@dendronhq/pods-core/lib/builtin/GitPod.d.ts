import { ExportPod, ExportPodPlantOpts, ExportPodConfig } from "../basev3";
import { JSONSchemaType } from "ajv";
export declare class GitPunchCardExportPod extends ExportPod {
    static id: string;
    static description: string;
    get config(): JSONSchemaType<ExportPodConfig>;
    parseChunk(chunk: string[]): {
        commit: string;
        time: string;
        files: number;
        insert: number;
        delete: number;
    };
    plant(opts: ExportPodPlantOpts): Promise<{
        notes: import("@dendronhq/common-all").NoteProps[];
    }>;
}
