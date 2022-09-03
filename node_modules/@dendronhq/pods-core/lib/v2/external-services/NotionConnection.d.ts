import { JSONSchemaType } from "ajv";
import { ExternalService, ExternalTarget } from "./ExternalConnectionManager";
/**
 * Represents a unique service connection to Notion.
 */
export declare class NotionConnection implements ExternalTarget {
    constructor(connectionId: string, apiKey: string);
    serviceType: ExternalService;
    private _apiKey;
    private _connectionId;
    /**
     * API Key to connect to Notion.  See
     * [[Authentication|dendron://dendron.dendron-site/dendron.topic.pod.builtin.notion#authentication]]
     */
    get apiKey(): string;
    /**
     * A unique ID to represent this Notion connection
     */
    get connectionId(): string;
    static getSchema(): JSONSchemaType<NotionConnection>;
}
