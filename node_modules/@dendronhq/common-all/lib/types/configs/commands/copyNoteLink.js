"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genDefaultCopyNoteLinkConfig = void 0;
function genDefaultCopyNoteLinkConfig() {
    // don't set a default for `nonNoteFiles`, we want to prompt the user whether they want lines or block anchors
    return { aliasMode: "title" };
}
exports.genDefaultCopyNoteLinkConfig = genDefaultCopyNoteLinkConfig;
//# sourceMappingURL=copyNoteLink.js.map