"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionConnection = void 0;
const ExternalConnectionManager_1 = require("./ExternalConnectionManager");
/**
 * Represents a unique service connection to Notion.
 */
class NotionConnection {
    constructor(connectionId, apiKey) {
        this.serviceType = ExternalConnectionManager_1.ExternalService.Notion;
        this._apiKey = apiKey;
        this._connectionId = connectionId;
    }
    /**
     * API Key to connect to Notion.  See
     * [[Authentication|dendron://dendron.dendron-site/dendron.topic.pod.builtin.notion#authentication]]
     */
    get apiKey() {
        return this._apiKey;
    }
    /**
     * A unique ID to represent this Notion connection
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
                    default: ExternalConnectionManager_1.ExternalService.Notion,
                },
                apiKey: { type: "string", description: "API Key to access Notion" },
            },
        };
    }
}
exports.NotionConnection = NotionConnection;
//# sourceMappingURL=NotionConnection.js.map