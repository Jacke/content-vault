"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryNoteCache = void 0;
const common_all_1 = require("@dendronhq/common-all");
class InMemoryNoteCache {
    constructor(notes) {
        this.mapFNameToNotes = InMemoryNoteCache.initializeFileNameMap(notes);
    }
    static initializeFileNameMap(notes) {
        const map = new Map();
        notes.forEach((note) => {
            const lowercaseName = note.fname.toLowerCase();
            let list = map.get(lowercaseName);
            if (list === undefined) {
                list = [];
            }
            list.push(note);
            map.set(lowercaseName, list);
        });
        return map;
    }
    /** Returns list of {@link NoteProps} that have matching file name (ignoring
     *  the file name case). Will return empty list if no notes match.  */
    getNotesByFileNameIgnoreCase(fileName) {
        if (fileName === undefined || fileName === null || fileName.length === 0) {
            throw new common_all_1.DendronError({
                message: `File name cannot be undefined/null/empty.`,
            });
        }
        const list = this.mapFNameToNotes.get(fileName.toLowerCase());
        if (list === undefined) {
            return [];
        }
        return list;
    }
}
exports.InMemoryNoteCache = InMemoryNoteCache;
//# sourceMappingURL=inMemoryNoteCache.js.map