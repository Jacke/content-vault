"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONExportPodV2 = void 0;
const common_all_1 = require("@dendronhq/common-all");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const __1 = require("../../..");
class JSONExportPodV2 {
    constructor({ podConfig }) {
        this._config = podConfig;
    }
    async exportNotes(input) {
        const { destination } = this._config;
        if (destination === "clipboard") {
            const out = JSON.stringify(input[0], null, 4);
            return common_all_1.ResponseUtil.createHappyResponse({
                data: {
                    exportedNotes: out,
                },
            });
        }
        try {
            fs_extra_1.default.ensureDirSync(path_1.default.dirname(destination));
            fs_extra_1.default.writeJSONSync(destination, input, { encoding: "utf8" });
        }
        catch (err) {
            return {
                data: {
                    exportedNotes: [],
                },
                error: err,
            };
        }
        return common_all_1.ResponseUtil.createHappyResponse({
            data: {
                exportedNotes: input,
            },
        });
    }
    static config() {
        return __1.ConfigFileUtils.createExportConfig({
            required: ["destination"],
            properties: {
                destination: {
                    description: "export destination. Specify either a file path or 'clipboard' to export to your clipboard",
                    type: "string",
                },
            },
        });
    }
}
exports.JSONExportPodV2 = JSONExportPodV2;
//# sourceMappingURL=JSONExportPodV2.js.map