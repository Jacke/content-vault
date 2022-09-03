import { DendronError, DVault, SchemaModuleProps } from "@dendronhq/common-all";
import { DLogger } from "@dendronhq/common-server";
export declare class SchemaParser {
    private logger;
    private wsRoot;
    constructor({ wsRoot, logger }: {
        wsRoot: string;
        logger: DLogger;
    });
    private parseFile;
    parse(fpaths: string[], vault: DVault): Promise<{
        schemas: SchemaModuleProps[];
        errors: DendronError[] | null;
    }>;
}
