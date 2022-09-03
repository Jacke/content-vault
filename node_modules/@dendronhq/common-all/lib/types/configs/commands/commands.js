"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genDefaultCommandConfig = void 0;
const _1 = require(".");
const insertNoteIndex_1 = require("./insertNoteIndex");
const insertNoteLink_1 = require("./insertNoteLink");
const lookup_1 = require("./lookup");
const randomNote_1 = require("./randomNote");
/**
 * Generates default {@link DendronCommandConfig} using
 * respective default config generators that each command config implements.
 * @returns DendronCommandConfig
 */
function genDefaultCommandConfig() {
    return {
        lookup: (0, lookup_1.genDefaultLookupConfig)(),
        randomNote: (0, randomNote_1.genDefaultRandomNoteConfig)(),
        insertNoteLink: (0, insertNoteLink_1.genDefaultInsertNoteLinkConfig)(),
        insertNoteIndex: (0, insertNoteIndex_1.genDefaultInsertNoteIndexConfig)(),
        copyNoteLink: (0, _1.genDefaultCopyNoteLinkConfig)(),
        templateHierarchy: "template",
    };
}
exports.genDefaultCommandConfig = genDefaultCommandConfig;
//# sourceMappingURL=commands.js.map