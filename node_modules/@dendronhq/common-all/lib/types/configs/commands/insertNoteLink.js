"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genDefaultInsertNoteLinkConfig = exports.InsertNoteLinkAliasModeEnum = void 0;
/**
 * Enum definitions of possible alias mode values
 */
var InsertNoteLinkAliasModeEnum;
(function (InsertNoteLinkAliasModeEnum) {
    InsertNoteLinkAliasModeEnum["snippet"] = "snippet";
    InsertNoteLinkAliasModeEnum["selection"] = "selection";
    InsertNoteLinkAliasModeEnum["title"] = "title";
    InsertNoteLinkAliasModeEnum["prompt"] = "prompt";
    InsertNoteLinkAliasModeEnum["none"] = "none";
})(InsertNoteLinkAliasModeEnum = exports.InsertNoteLinkAliasModeEnum || (exports.InsertNoteLinkAliasModeEnum = {}));
/**
 * Generates default {@link InsertNoteLinkConfig}
 * @returns InsertNoteLinkConfig
 */
function genDefaultInsertNoteLinkConfig() {
    return {
        aliasMode: InsertNoteLinkAliasModeEnum.none,
        enableMultiSelect: false,
    };
}
exports.genDefaultInsertNoteLinkConfig = genDefaultInsertNoteLinkConfig;
//# sourceMappingURL=insertNoteLink.js.map