import { JSONSchemaType } from "ajv";
import { ExternalService, ExternalTarget } from "./ExternalConnectionManager";
/**
 * Represents a unique service connection to Airtable.
 */
export declare class AirtableConnection implements ExternalTarget {
    constructor(connectionId: string, apiKey: string);
    serviceType: ExternalService;
    private _apiKey;
    private _connectionId;
    /**
     * API Key to connect to airtable.  See
     * https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-
     */
    get apiKey(): string;
    /**
     * A unique ID to represent this airtable connection
     */
    get connectionId(): string;
    static getSchema(): JSONSchemaType<AirtableConnection>;
}
