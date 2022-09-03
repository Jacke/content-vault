"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaParser = void 0;
const common_all_1 = require("@dendronhq/common-all");
const common_server_1 = require("@dendronhq/common-server");
const fs_extra_1 = __importDefault(require("fs-extra"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
class SchemaParser {
    constructor({ wsRoot, logger }) {
        this.wsRoot = wsRoot;
        this.logger = logger;
    }
    async parseFile(fpath, root) {
        const fname = path_1.default.basename(fpath, ".schema.yml");
        const wsRoot = this.wsRoot;
        const vpath = (0, common_server_1.vault2Path)({ vault: root, wsRoot });
        const schemaOpts = js_yaml_1.default.load(await fs_extra_1.default.readFile(path_1.default.join(vpath, fpath), "utf8"));
        return common_server_1.SchemaParserV2.parseRaw(schemaOpts, { root, fname, wsRoot });
    }
    async parse(fpaths, vault) {
        const ctx = "parse";
        this.logger.info({ ctx, msg: "enter", fpaths, vault });
        const out = await Promise.all(fpaths.flatMap(async (fpath) => {
            try {
                return await this.parseFile(fpath, vault);
            }
            catch (err) {
                let message;
                if (err instanceof Error) {
                    message = err.message;
                }
                const vpath = (0, common_server_1.vault2Path)({ wsRoot: this.wsRoot, vault });
                const fullPath = path_1.default.join(vpath, fpath);
                return new common_all_1.DendronError({
                    message: message || common_all_1.ERROR_STATUS.BAD_PARSE_FOR_SCHEMA,
                    status: common_all_1.ERROR_STATUS.BAD_PARSE_FOR_SCHEMA,
                    payload: { fpath, message, fullPath },
                });
            }
        }));
        const errors = lodash_1.default.filter(out, (ent) => ent instanceof common_all_1.DendronError);
        return {
            schemas: lodash_1.default.reject(out, (ent) => ent instanceof common_all_1.DendronError),
            errors: lodash_1.default.isEmpty(errors) ? null : errors,
        };
    }
}
exports.SchemaParser = SchemaParser;
//# sourceMappingURL=schemaParser.js.map