"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDocsConnection = void 0;
const ExternalConnectionManager_1 = require("./ExternalConnectionManager");
/**
 * Represents a unique service connection to Airtable.
 */
class GoogleDocsConnection {
    constructor(connectionId, accessToken, refreshToken, expirationTime) {
        this.serviceType = ExternalConnectionManager_1.ExternalService.GoogleDocs;
        this._accessToken = accessToken;
        this._connectionId = connectionId;
        this._refreshToken = refreshToken;
        this._expirationTime = expirationTime;
    }
    /**
     * personal access token for google services
     */
    get accessToken() {
        return this._accessToken;
    }
    /**
     * personal refresh token for google services
     */
    get refreshToken() {
        return this._refreshToken;
    }
    /**
     * A unique ID to represent this google connection
     */
    get connectionId() {
        return this._connectionId;
    }
    get expirationTime() {
        return this._expirationTime;
    }
    static getSchema() {
        return {
            type: "object",
            required: ["connectionId", "serviceType", "accessToken", "refreshToken"],
            properties: {
                connectionId: {
                    description: "configuration ID",
                    type: "string",
                },
                serviceType: {
                    type: "string",
                    description: "Connection Type",
                    default: ExternalConnectionManager_1.ExternalService.GoogleDocs,
                },
                accessToken: {
                    type: "string",
                    description: "google docs personal access token",
                },
                refreshToken: {
                    type: "string",
                    description: "google docs personal refresh token",
                },
                expirationTime: {
                    type: "number",
                    description: "expiration time of access token",
                },
            },
        };
    }
}
exports.GoogleDocsConnection = GoogleDocsConnection;
//# sourceMappingURL=GoogleDocsConnection.js.map