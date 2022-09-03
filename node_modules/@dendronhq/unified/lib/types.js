"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultMissingBehavior = exports.DendronASTTypes = exports.DendronASTDest = void 0;
const common_all_1 = require("@dendronhq/common-all");
Object.defineProperty(exports, "DendronASTDest", { enumerable: true, get: function () { return common_all_1.DendronASTDest; } });
var DendronASTTypes;
(function (DendronASTTypes) {
    DendronASTTypes["WIKI_LINK"] = "wikiLink";
    DendronASTTypes["REF_LINK_V2"] = "refLinkV2";
    DendronASTTypes["BLOCK_ANCHOR"] = "blockAnchor";
    DendronASTTypes["HASHTAG"] = "hashtag";
    DendronASTTypes["USERTAG"] = "usertag";
    DendronASTTypes["EXTENDED_IMAGE"] = "extendedImage";
    // Not dendron-specific, included here for convenience
    DendronASTTypes["ROOT"] = "root";
    DendronASTTypes["HEADING"] = "heading";
    DendronASTTypes["LIST"] = "list";
    DendronASTTypes["LIST_ITEM"] = "listItem";
    DendronASTTypes["PARAGRAPH"] = "paragraph";
    DendronASTTypes["TEXT"] = "text";
    DendronASTTypes["TABLE"] = "table";
    DendronASTTypes["TABLE_ROW"] = "tableRow";
    DendronASTTypes["TABLE_CELL"] = "tableCell";
    DendronASTTypes["IMAGE"] = "image";
    DendronASTTypes["FRONTMATTER"] = "yaml";
    DendronASTTypes["LINK"] = "link";
    DendronASTTypes["CODE"] = "code";
    DendronASTTypes["INLINE_CODE"] = "inlineCode";
    DendronASTTypes["FOOTNOTE_DEFINITION"] = "footnoteDefinition";
    DendronASTTypes["FOOTNOTE_REFERENCE"] = "footnoteReference";
    DendronASTTypes["HTML"] = "html";
    DendronASTTypes["YAML"] = "yaml";
})(DendronASTTypes = exports.DendronASTTypes || (exports.DendronASTTypes = {}));
var VaultMissingBehavior;
(function (VaultMissingBehavior) {
    VaultMissingBehavior[VaultMissingBehavior["FALLBACK_TO_ORIGINAL_VAULT"] = 0] = "FALLBACK_TO_ORIGINAL_VAULT";
    VaultMissingBehavior[VaultMissingBehavior["THROW_ERROR"] = 1] = "THROW_ERROR";
})(VaultMissingBehavior = exports.VaultMissingBehavior || (exports.VaultMissingBehavior = {}));
//# sourceMappingURL=types.js.map