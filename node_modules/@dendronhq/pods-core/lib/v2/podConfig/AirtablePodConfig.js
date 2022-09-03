"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunnableAirtableV2PodConfigSchema = exports.isRunnableAirtableV2PodConfig = void 0;
/**
 * Helper function to perform a type check on an object to see if it's an
 * instance of {@link RunnableAirtableV2PodConfig}
 * @param object
 * @returns
 */
function isRunnableAirtableV2PodConfig(object) {
    return (object !== undefined &&
        "apiKey" in object &&
        "baseId" in object &&
        "tableName" in object &&
        "sourceFieldMapping" in object &&
        object["sourceFieldMapping"] &&
        "exportScope" in object);
}
exports.isRunnableAirtableV2PodConfig = isRunnableAirtableV2PodConfig;
function createRunnableAirtableV2PodConfigSchema() {
    return {
        type: "object",
        required: [
            "apiKey",
            "baseId",
            "tableName",
            "sourceFieldMapping",
            "exportScope",
            "podId",
        ],
        properties: {
            apiKey: {
                type: "string",
            },
            baseId: {
                type: "string",
            },
            tableName: {
                type: "string",
            },
            sourceFieldMapping: {
                type: "object",
                required: [],
            },
            exportScope: {
                type: "string",
            },
            filters: {
                type: "object",
                required: [],
                nullable: true,
                properties: {
                    fname: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
            },
            podId: {
                type: "string",
            },
        },
    };
}
exports.createRunnableAirtableV2PodConfigSchema = createRunnableAirtableV2PodConfigSchema;
//# sourceMappingURL=AirtablePodConfig.js.map