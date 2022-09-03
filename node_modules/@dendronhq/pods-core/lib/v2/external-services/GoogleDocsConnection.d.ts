import { JSONSchemaType } from "ajv";
import { ExternalService, ExternalTarget } from "./ExternalConnectionManager";
/**
 * Represents a unique service connection to Airtable.
 */
export declare class GoogleDocsConnection implements ExternalTarget {
    constructor(connectionId: string, accessToken: string, refreshToken: string, expirationTime: number);
    serviceType: ExternalService;
    private _accessToken;
    private _refreshToken;
    private _connectionId;
    private _expirationTime;
    /**
     * personal access token for google services
     */
    get accessToken(): string;
    /**
     * personal refresh token for google services
     */
    get refreshToken(): string;
    /**
     * A unique ID to represent this google connection
     */
    get connectionId(): string;
    get expirationTime(): number;
    static getSchema(): JSONSchemaType<GoogleDocsConnection>;
}
