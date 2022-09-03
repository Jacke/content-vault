"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodV2ConfigManager = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const __1 = require("..");
class PodV2ConfigManager {
    /**
     * Get a pod config by its ID. The returned value will also have its
     * connection props in its return value
     * @param param0
     * @returns pod config if it exists, otherwise undefined
     */
    static getPodConfigById({ podsDir, opts, }) {
        // TODO: cache for more efficient lookup
        const files = PodV2ConfigManager.getConfigFiles(podsDir);
        for (const fPath of files) {
            let config = __1.ConfigFileUtils.getConfigByFPath({
                fPath,
            });
            if (config && config.podId && config.podId === opts.podId) {
                if (config.connectionId) {
                    const mngr = new __1.ExternalConnectionManager(podsDir);
                    const connectionConfig = mngr.getConfigById({
                        id: config.connectionId,
                    });
                    config = lodash_1.default.merge(config, connectionConfig);
                }
                return config;
            }
        }
        return undefined;
    }
    /**
     * Retrieve all valid pod configs in the specified directory
     * @param podsDir
     * @returns
     */
    static getAllPodConfigs(podsDir) {
        const configs = [];
        const files = PodV2ConfigManager.getConfigFiles(podsDir);
        for (const fPath of files) {
            const config = __1.ConfigFileUtils.getConfigByFPath({
                fPath,
            });
            /**
             *TODO: give some UI feedback if the user config is not Runnable. Either
             * some visual cue within the quick pick itself or
             * When the config is open, have some sort of code warning.
             */
            configs.push(config);
        }
        return configs;
    }
    static getConfigFiles(podsDir) {
        if (fs_extra_1.default.existsSync(podsDir)) {
            return fs_extra_1.default
                .readdirSync(podsDir)
                .filter((file) => file.endsWith(".yml"))
                .map((filename) => path_1.default.join(podsDir, filename));
        }
        return [];
    }
    /**
     * Get all persisted configs for a particular type of pod
     * @param type
     * @returns
     */
    static async getAllConfigsByType(opts) {
        const { type, podsDir } = opts;
        const configs = PodV2ConfigManager.getAllPodConfigs(podsDir);
        return configs.filter((config) => config.podType === type);
    }
}
exports.PodV2ConfigManager = PodV2ConfigManager;
//# sourceMappingURL=PodConfigManager.js.map