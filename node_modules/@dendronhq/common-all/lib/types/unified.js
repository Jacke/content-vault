"use strict";
// Contains types that help with Dendron's unifiedjs markdown processor.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcFlavor = exports.DendronASTDest = void 0;
/** The expected output from the processor, if the processor is used to process or stringify a tree. */
var DendronASTDest;
(function (DendronASTDest) {
    /**
     * @deprecated - no longer needed since we don't use the markdown preview
     * enhanced anymore
     */
    DendronASTDest["MD_ENHANCED_PREVIEW"] = "MD_ENHANCED_PREVIEW";
    DendronASTDest["MD_REGULAR"] = "MD_REGULAR";
    DendronASTDest["MD_DENDRON"] = "MD_DENDRON";
    DendronASTDest["HTML"] = "HTML";
})(DendronASTDest = exports.DendronASTDest || (exports.DendronASTDest = {}));
/**
 * If processor should run in an alternative flavor
 */
var ProcFlavor;
(function (ProcFlavor) {
    /**
     * No special processing
     */
    ProcFlavor["REGULAR"] = "REGULAR";
    /**
     * Apply publishing rules
     */
    ProcFlavor["PUBLISHING"] = "PUBLISHING";
    /**
     * Apply preview rules
     */
    ProcFlavor["PREVIEW"] = "PREVIEW";
    /**
     * Apply hover preview rules (used for the preview when hovering over a link)
     */
    ProcFlavor["HOVER_PREVIEW"] = "HOVER_PREVIEW";
    /**
     * Apply special hover preview rules for the backlinks panel.
     */
    ProcFlavor["BACKLINKS_PANEL_HOVER"] = "BACKLINK_HOVER";
})(ProcFlavor = exports.ProcFlavor || (exports.ProcFlavor = {}));
//# sourceMappingURL=unified.js.map