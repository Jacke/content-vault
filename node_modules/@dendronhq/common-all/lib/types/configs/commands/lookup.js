"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genDefaultLookupConfig = exports.LookupSelectVaultModeOnCreateEnum = exports.LookupSelectionModeEnum = void 0;
/**
 * Enum definition of possible lookup selection behavior values
 */
var LookupSelectionModeEnum;
(function (LookupSelectionModeEnum) {
    LookupSelectionModeEnum["extract"] = "extract";
    LookupSelectionModeEnum["link"] = "link";
    LookupSelectionModeEnum["none"] = "none";
})(LookupSelectionModeEnum = exports.LookupSelectionModeEnum || (exports.LookupSelectionModeEnum = {}));
var LookupSelectVaultModeOnCreateEnum;
(function (LookupSelectVaultModeOnCreateEnum) {
    LookupSelectVaultModeOnCreateEnum["smart"] = "smart";
    LookupSelectVaultModeOnCreateEnum["alwaysPrompt"] = "alwaysPrompt";
})(LookupSelectVaultModeOnCreateEnum = exports.LookupSelectVaultModeOnCreateEnum || (exports.LookupSelectVaultModeOnCreateEnum = {}));
/**
 * Generates default {@link LookupConfig}
 * @returns LookupConfig
 */
function genDefaultLookupConfig() {
    return {
        note: {
            selectionMode: LookupSelectionModeEnum.extract,
            confirmVaultOnCreate: true,
            vaultSelectionModeOnCreate: LookupSelectVaultModeOnCreateEnum.smart,
            leaveTrace: false,
            bubbleUpCreateNew: true,
            /**
             * Experimentally set.
             *
             * At the time of testing:
             *
             * At previous threshold of 0.5 string 'dendron' matched
             * 'scratch.2021.06.15.104331.make-sure-seeds-are-initialized-on-startup' with score 0.42.
             * Which is too fuzzy of a match.
             *
             * 'rename' fuzzy matches 'dendron.scratch.2020.11.07.publish-under-original-filenames' with 0.16.
             *
             * For reference
             * 'dendron rename' matches 'dendron.dev.design.commands.rename' with 0.001.
             *
             * Having this score too high gets too unrelated matches which pushes the
             * 'Create New' entry out of the view.
             * --------------------------------------------------------------------------------
             *
             * Note if you are going to be tweaking this value it is highly suggested to add a
             * temporary piece of code To be able to see the all the results that are matched by
             * fuse engine along with their scores, inside {@link FuseEngine.queryNote}
             * */
            fuzzThreshold: 0.2,
        },
    };
}
exports.genDefaultLookupConfig = genDefaultLookupConfig;
//# sourceMappingURL=lookup.js.map