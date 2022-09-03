"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJSFileStore = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const common_all_1 = require("@dendronhq/common-all");
const lodash_1 = __importDefault(require("lodash"));
const common_server_1 = require("@dendronhq/common-server");
class NodeJSFileStore {
    /**
     * See {@link IFileStore.read}
     */
    async read(uri) {
        try {
            const data = await fs_extra_1.default.readFile(uri.fsPath, { encoding: "utf8" });
            return { data };
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.CONTENT_NOT_FOUND,
                    message: `Failed to read from ${uri.fsPath}.`,
                    innerError: err,
                    severity: common_all_1.ERROR_SEVERITY.MINOR,
                }),
            };
        }
    }
    /**
     * See {@link IFileStore.readDir}
     */
    async readDir(opts) {
        const { root } = lodash_1.default.defaults(opts, {
            exclude: [".git", "Icon\r", ".*"],
        });
        try {
            const resp = await (0, common_server_1.getAllFiles)(opts);
            if (resp.error) {
                return { error: resp.error };
            }
            else if (resp.data) {
                return { data: resp.data };
            }
            else {
                return { data: [] };
            }
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.CONTENT_NOT_FOUND,
                    message: `Failed to read from ${root}.`,
                    innerError: err,
                    severity: common_all_1.ERROR_SEVERITY.MINOR,
                }),
            };
        }
    }
    /**
     * See {@link IFileStore.write}
     */
    async write(uri, content) {
        try {
            await fs_extra_1.default.writeFile(uri.fsPath, content);
            return { data: uri };
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.WRITE_FAILED,
                    message: `Failed to write to ${uri.fsPath}.`,
                    innerError: err,
                    severity: common_all_1.ERROR_SEVERITY.MINOR,
                }),
            };
        }
    }
    /**
     * See {@link IFileStore.delete}
     */
    async delete(uri) {
        try {
            if (await fs_extra_1.default.pathExists(uri.fsPath)) {
                await fs_extra_1.default.unlink(uri.fsPath);
            }
            return { data: uri };
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.DELETE_FAILED,
                    message: `Failed to delete from ${uri.fsPath}.`,
                    innerError: err,
                    severity: common_all_1.ERROR_SEVERITY.MINOR,
                }),
            };
        }
    }
    /**
     * See {@link IFileStore.rename}
     */
    async rename(oldUri, newUri) {
        try {
            await fs_extra_1.default.rename(oldUri.fsPath, newUri.fsPath);
            return { data: newUri };
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.RENAME_FAILED,
                    message: `Failed to rename from ${oldUri.fsPath} to ${newUri.fsPath}.`,
                    innerError: err,
                    severity: common_all_1.ERROR_SEVERITY.MINOR,
                }),
            };
        }
    }
}
exports.NodeJSFileStore = NodeJSFileStore;
//# sourceMappingURL=NodeJSFileStore.js.map