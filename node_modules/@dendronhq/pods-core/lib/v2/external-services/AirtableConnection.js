"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtableConnection = void 0;
const ExternalConnectionManager_1 = require("./ExternalConnectionManager");
/**
 * Represents a unique service connection to Airtable.
 */
class AirtableConnection {
    constructor(connectionId, apiKey) {
        this.serviceType = ExternalConnectionManager_1.ExternalService.Airtable;
        this._apiKey = apiKey;
        this._connectionId = connectionId;
    }
    /**
     * API Key to connect to airtable.  See
     * https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-
     */
    get apiKey() {
        return this._apiKey;
    }
    /**
     * A unique ID to represent this airtable connection
     */
    get connectionId() {
        return this._connectionId;
    }
    static getSchema() {
        return {
            type: "object",
            required: ["connectionId", "serviceType", "apiKey"],
            properties: {
                connectionId: {
                    description: "configuration ID",
                    type: "string",
                },
                serviceType: {
                    type: "string",
                    description: "Connection Type",
                    default: ExternalConnectionManager_1.ExternalService.Airtable,
                },
                apiKey: { type: "string", description: "API Key to access Airtable" },
            },
        };
    }
}
exports.AirtableConnection = AirtableConnection;
//# sourceMappingURL=AirtableConnection.js.map