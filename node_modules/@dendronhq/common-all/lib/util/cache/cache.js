"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullCache = void 0;
/** Null object implementation of {@link Cache} to be used when we
 *  dont want the code to actually use the cache. */
class NullCache {
    get(_key) {
        return undefined;
    }
    set(_key, _data) {
        // Empty since this is null object implementation
    }
    drop(_key) {
        // Empty since this is null object implementation
    }
}
exports.NullCache = NullCache;
//# sourceMappingURL=cache.js.map