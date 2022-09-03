"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedUtils = void 0;
const common_all_1 = require("@dendronhq/common-all");
const fs_extra_1 = __importDefault(require("fs-extra"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const workspace_1 = require("../workspace");
const constants_1 = require("./constants");
class SeedUtils {
    static exists({ id, wsRoot }) {
        const seedPath = this.seed2Path({ id, wsRoot });
        return fs_extra_1.default.pathExists(seedPath);
    }
    static genDefaultConfig(opts) {
        return lodash_1.default.defaults(opts.seed || {}, {
            id: opts.id,
            name: opts.name,
            publisher: constants_1.DEFAULT_SEED_PUBLISHER,
            description: "a seed waiting to sprout",
            license: "CC BY 4.0",
            repository: {
                type: "git",
                url: "",
            },
            root: "vault",
        });
    }
    static getSeedId({ publisher, name }) {
        return `${publisher}.${name}`;
    }
    /**
     * Path for seed
     * @param wsRoot - workspace root
     * @param id - id of seed
     * @returns
     */
    static seed2Path({ wsRoot, id }) {
        return path_1.default.join(wsRoot, "seeds", id);
    }
    static seed2Vault({ seed }) {
        const id = this.getSeedId(seed);
        return {
            fsPath: seed.root,
            seed: id,
            name: id,
        };
    }
    static validateWorkspaceSeedConversion({ wsRoot }) {
        const config = workspace_1.WorkspaceService.getOrCreateConfig(wsRoot);
        const vaults = common_all_1.ConfigUtils.getVaults(config);
        if (vaults.length !== 1) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.INVALID_STATE,
                    message: `workspace must have exactly one vault. found ${JSON.stringify(vaults)}`,
                }),
            };
        }
        const workspaces = common_all_1.ConfigUtils.getWorkspace(config).workspaces;
        if (!lodash_1.default.isEmpty(workspaces)) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.INVALID_STATE,
                    message: "workspace vaults not supported",
                }),
            };
        }
        return {
            error: undefined,
        };
    }
}
exports.SeedUtils = SeedUtils;
//# sourceMappingURL=utils.js.map