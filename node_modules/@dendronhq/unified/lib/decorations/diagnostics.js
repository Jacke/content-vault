"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndWarnBadFrontmatter = exports.warnMissingFrontmatter = exports.NOT_A_STUB = exports.BAD_FRONTMATTER_CODE = void 0;
const common_all_1 = require("@dendronhq/common-all");
const lodash_1 = __importDefault(require("lodash"));
const js_yaml_1 = __importDefault(require("js-yaml"));
// These are used to match the warnings to code actions. Also displayed for users along with the warning message.
exports.BAD_FRONTMATTER_CODE = "bad frontmatter";
exports.NOT_A_STUB = "not a stub";
// These are error messages to display which tell the user how to fix the issue.
const RESOLVE_MESSAGE_AUTO_ONLY = "Please use the lightbulb, or run the Dendron: Doctor command.";
const RESOLVE_MESSAGE = "Please use the lightbulb, run the Dendron: Doctor command, or manually correct it.";
function badFrontmatter(props) {
    return {
        /** Displayed to the user next to the warning message. */
        source: "Dendron",
        ...props,
    };
}
function warnMissingFrontmatter() {
    const diagnostic = badFrontmatter({
        message: `The frontmatter is missing. All notes in Dendron must have a frontmatter. ${RESOLVE_MESSAGE_AUTO_ONLY}`,
        range: (0, common_all_1.newRange)(0, 0, 8, 15),
        severity: common_all_1.DiagnosticSeverity.Error,
        code: exports.BAD_FRONTMATTER_CODE,
    });
    return diagnostic;
}
exports.warnMissingFrontmatter = warnMissingFrontmatter;
function checkAndWarnBadFrontmatter(note, frontmatter) {
    const diagnostics = [];
    const errors = [];
    const range = (0, common_all_1.position2VSCodeRange)(frontmatter.position);
    try {
        const frontmatterData = js_yaml_1.default.load(frontmatter.value);
        if (!lodash_1.default.isString(frontmatterData.id)) {
            // Missing id
            diagnostics.push(badFrontmatter({
                message: `Note id is missing. ${RESOLVE_MESSAGE_AUTO_ONLY}`,
                range,
                code: exports.BAD_FRONTMATTER_CODE,
                severity: common_all_1.DiagnosticSeverity.Error,
            }));
        }
        else if (frontmatterData.id.match(/^[-_]|[-_]$/)) {
            diagnostics.push(badFrontmatter({
                message: `Note id is bad, it will not work in Github publishing. ${RESOLVE_MESSAGE}`,
                range,
                code: exports.BAD_FRONTMATTER_CODE,
                severity: common_all_1.DiagnosticSeverity.Warning,
            }));
        }
        else if (note && frontmatterData.stub && /[^\s]/.test(note.body)) {
            // note body has non-whitespace characters in it
            diagnostics.push(badFrontmatter({
                message: `This note is not a stub, Please remove the stub property or update it to false`,
                range,
                code: exports.NOT_A_STUB,
                severity: common_all_1.DiagnosticSeverity.Warning,
            }));
        }
    }
    catch (err) {
        errors.push(new common_all_1.DendronError({
            message: "failed to parse frontmatter",
            payload: err,
        }));
        diagnostics.push(badFrontmatter({
            message: `The frontmatter is broken. ${RESOLVE_MESSAGE}`,
            range,
            severity: common_all_1.DiagnosticSeverity.Error,
        }));
    }
    return { diagnostics, errors };
}
exports.checkAndWarnBadFrontmatter = checkAndWarnBadFrontmatter;
//# sourceMappingURL=diagnostics.js.map