"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DendronFileSystemCache = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
class DendronFileSystemCache {
    constructor({ cachePath, noCaching, logger, }) {
        this._cachePath = cachePath;
        this._noCaching = noCaching;
        this._logger = logger;
        this._numCacheMisses = 0;
        if (this._noCaching) {
            this._cacheContents = this.createEmptyCacheContents();
        }
        else {
            this._cacheContents = this.readFromFileSystem();
        }
    }
    get numCacheMisses() {
        return this._numCacheMisses;
    }
    /**
     * Read contents from filesystem including version and cache entries
     * @returns cache contents
     */
    readFromFileSystem() {
        const ctx = "DendronFileSystemCache:readFromFileSystem";
        if (fs_extra_1.default.existsSync(this._cachePath)) {
            try {
                return fs_extra_1.default.readJSONSync(this._cachePath);
            }
            catch (_err) {
                this._logger.error({ ctx, _err });
                return this.createEmptyCacheContents();
            }
        }
        else {
            return this.createEmptyCacheContents();
        }
    }
    /**
     * Write contents of cache to file system
     */
    writeToFileSystem() {
        if (!this._noCaching) {
            return fs_extra_1.default.writeJSONSync(this._cachePath, this._cacheContents);
        }
        return;
    }
    /**
     * Delete cache file if it exists
     */
    removeFromFileSystem() {
        this.createEmptyCacheContents();
        if (fs_extra_1.default.pathExistsSync(this._cachePath)) {
            return fs_extra_1.default.removeSync(this._cachePath);
        }
        return;
    }
    incrementCacheMiss() {
        this._numCacheMisses += 1;
    }
}
exports.DendronFileSystemCache = DendronFileSystemCache;
//# sourceMappingURL=dendronFileSystemCache.js.map