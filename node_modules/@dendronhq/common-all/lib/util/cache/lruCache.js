"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCache = void 0;
const lru_cache_1 = __importDefault(require("lru-cache"));
const error_1 = require("../../error");
/**
 *  Least recently used cache implementation. Deletes the least-recently-used
 *  items, when cache max items is reached.
 *  (get methods count toward recently used order) */
class LruCache {
    constructor(opts) {
        if (opts.maxItems <= 0) {
            throw new error_1.DendronError({
                message: `Max items cannot be less than or equal to 0`,
            });
        }
        this.cache = new lru_cache_1.default({
            max: opts.maxItems,
        });
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, data) {
        this.cache.set(key, data);
    }
    drop(key) {
        this.cache.del(key);
    }
}
exports.LruCache = LruCache;
//# sourceMappingURL=lruCache.js.map