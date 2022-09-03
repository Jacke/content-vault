"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineFileWatcher = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const common_server_1 = require("@dendronhq/common-server");
const path_1 = __importDefault(require("path"));
class EngineFileWatcher {
    constructor(base, pattern, chokidarOpts, onReady) {
        // Chokidar requires paths with globs to use POSIX `/` separators, even on Windows
        const patternWithBase = `${path_1.default.posix.normalize(base)}/${pattern}`;
        this.watcher = chokidar_1.default.watch(patternWithBase, {
            disableGlobbing: false,
            ignoreInitial: true,
            ignored: common_server_1.COMMON_FOLDER_IGNORES,
            ...chokidarOpts,
        });
        if (onReady)
            this.watcher.on("ready", onReady);
    }
    onEvent(event, callback) {
        this.watcher.on(event, callback);
        return {
            dispose: () => {
                this.watcher.removeAllListeners(event);
            },
        };
    }
    onDidCreate(callback) {
        return this.onEvent("add", callback);
    }
    onDidDelete(callback) {
        return this.onEvent("unlink", callback);
    }
    onDidChange(callback) {
        return this.onEvent("change", callback);
    }
}
exports.EngineFileWatcher = EngineFileWatcher;
//# sourceMappingURL=fileWatcher.js.map