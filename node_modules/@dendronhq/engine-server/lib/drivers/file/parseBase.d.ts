import { DStore } from "@dendronhq/common-all";
import { DLogger } from "@dendronhq/common-server";
export declare class ParserBase {
    opts: {
        store: DStore;
        logger: DLogger;
    };
    constructor(opts: {
        store: DStore;
        logger: DLogger;
    });
    get logger(): DLogger;
}
