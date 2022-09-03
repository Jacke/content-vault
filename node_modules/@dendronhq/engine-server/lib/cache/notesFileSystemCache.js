"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesFileSystemCache = void 0;
const lodash_1 = __importDefault(require("lodash"));
const dendronFileSystemCache_1 = require("./dendronFileSystemCache");
class NotesFileSystemCache extends dendronFileSystemCache_1.DendronFileSystemCache {
    get(key) {
        return this._cacheContents.notes[key];
    }
    set(key, value) {
        this._cacheContents.notes[key] = value;
    }
    drop(key) {
        delete this._cacheContents.notes[key];
    }
    getCacheEntryKeys() {
        return new Set(lodash_1.default.keys(this._cacheContents.notes));
    }
    createEmptyCacheContents() {
        return { version: 0, notes: {} };
    }
}
exports.NotesFileSystemCache = NotesFileSystemCache;
//# sourceMappingURL=notesFileSystemCache.js.map