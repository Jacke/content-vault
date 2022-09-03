"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunnableMarkdownV2PodConfigSchema = exports.isRunnableMarkdownV2PodConfig = void 0;
/**
 * Helper function to perform a type check on an object to see if it's an
 * instance of {@link RunnableMarkdownV2PodConfig}
 * @param object
 * @returns
 */
function isRunnableMarkdownV2PodConfig(object) {
    return (object !== undefined && "destination" in object && "exportScope" in object);
}
exports.isRunnableMarkdownV2PodConfig = isRunnableMarkdownV2PodConfig;
/**
 *
 * @returns
 * creates an AJV schema for runnable config
 */
function createRunnableMarkdownV2PodConfigSchema() {
    return {
        type: "object",
        required: ["destination", "exportScope"],
        properties: {
            destination: {
                type: "string",
            },
            exportScope: {
                type: "string",
            },
            description: {
                type: "string",
                nullable: true,
            },
            wikiLinkToURL: {
                type: "boolean",
                default: false,
                nullable: true,
            },
            convertTagNotesToLinks: {
                type: "boolean",
                default: false,
                nullable: true,
            },
            convertUserNotesToLinks: {
                type: "boolean",
                default: false,
                nullable: true,
            },
            addFrontmatterTitle: {
                type: "boolean",
                nullable: true,
            },
        },
    };
}
exports.createRunnableMarkdownV2PodConfigSchema = createRunnableMarkdownV2PodConfigSchema;
//# sourceMappingURL=MarkdownPodConfig.js.map