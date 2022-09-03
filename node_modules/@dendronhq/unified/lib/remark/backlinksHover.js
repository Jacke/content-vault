"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backlinksHover = void 0;
const unist_util_visit_1 = __importDefault(require("unist-util-visit"));
const types_1 = require("../types");
const utils_1 = require("./utils");
/**
 * Unified processor for rendering text in the backlinks hover control. This
 * processor returns a transformer that does the following:
 * 1. Highlights the backlink text
 * 2. Changes the backlink node away from a wikilink/noteref to prevent the
 *    backlink text from being altered
 * 3. Adds contextual " --- line # ---" information
 * 4. Removes all elements that lie beyond the contextual lines limit of the
 *    backlink
 * @param this
 * @param _opts
 * @returns
 */
function backlinksHover(_opts) {
    function transformer(tree, _file) {
        if (!_opts) {
            return;
        }
        const backlinkLineNumber = _opts.location.start.line;
        const lowerLineLimit = backlinkLineNumber - _opts.linesOfContext;
        const upperLineLimit = backlinkLineNumber + _opts.linesOfContext;
        /**
         * The last line of the YAML frontmatter counts as line 0.
         */
        let documentBodyStartLine = 0;
        let documentEndLine = 0;
        // In the first visit, set the beginning and end markers of the document.
        (0, unist_util_visit_1.default)(tree, [types_1.DendronASTTypes.ROOT], (node, _index, _parent) => {
            var _a, _b, _c, _d;
            if (utils_1.RemarkUtils.isRoot(node)) {
                documentEndLine = (_b = (_a = node.position) === null || _a === void 0 ? void 0 : _a.end.line) !== null && _b !== void 0 ? _b : 0;
                // Count the last line of YAML as the 0 indexed start of the body of the document
                if (utils_1.RemarkUtils.isYAML(node.children[0])) {
                    documentBodyStartLine = (_d = (_c = node.children[0].position) === null || _c === void 0 ? void 0 : _c.end.line) !== null && _d !== void 0 ? _d : 0;
                }
            }
        });
        // In the second visit, modify the wikilink/ref/candidate that is the
        // backlink to highlight it and to change its node type so that it appears
        // in its text form to the user (we don't want to convert a noteref backlink
        // into its reffed contents for example)
        (0, unist_util_visit_1.default)(tree, (node, index, parent) => {
            var _a, _b, _c, _d;
            if (!node.position) {
                return;
            }
            // Remove all elements that fall outside of the context boundary limits
            if (node.position.end.line < lowerLineLimit ||
                node.position.start.line > upperLineLimit) {
                if (parent) {
                    parent.children.splice(index, 1);
                    return index;
                }
            }
            // Make special adjustments for preceding and succeeding code blocks that
            // straddle the context boundaries
            if (node.position && node.position.start.line < lowerLineLimit) {
                if (utils_1.RemarkUtils.isCode(node)) {
                    const lines = node.value.split("\n");
                    node.value = lines
                        .slice(Math.max(0, lowerLineLimit - node.position.start.line - 2), // Adjust an offset to account for the code block ``` lines
                    lines.length - 1)
                        .join("\n");
                }
            }
            else if (node.position && node.position.end.line > upperLineLimit) {
                if (utils_1.RemarkUtils.isCode(node)) {
                    const lines = node.value.split("\n");
                    node.value = lines
                        .slice(0, upperLineLimit - node.position.end.line + 1 // Adjust an offset of 1 to account for the code block ``` line
                    )
                        .join("\n");
                }
            }
            // Do the node replacement for wikilinks, node refs, and text blocks when
            // it's a candidate link
            if (utils_1.RemarkUtils.isWikiLink(node)) {
                if (backlinkLineNumber === ((_a = node.position) === null || _a === void 0 ? void 0 : _a.start.line) &&
                    node.position.start.column === _opts.location.start.column) {
                    let wiklinkText = `${node.value}`;
                    if (node.data.anchorHeader) {
                        wiklinkText += `#${node.data.anchorHeader}`;
                    }
                    node.type = types_1.DendronASTTypes.HTML;
                    node.value = getHTMLToHighlightText(`[[${wiklinkText}]]`);
                }
            }
            else if (utils_1.RemarkUtils.isNoteRefV2(node)) {
                if (backlinkLineNumber === ((_b = node.position) === null || _b === void 0 ? void 0 : _b.start.line) &&
                    node.position.start.column === _opts.location.start.column) {
                    let noteRefText = `${node.value}`;
                    if (node.data.link.data.anchorStart) {
                        noteRefText += `#${node.data.link.data.anchorStart}`;
                    }
                    if (node.data.link.data.anchorEnd) {
                        noteRefText += `:#${node.data.link.data.anchorEnd}`;
                    }
                    node.type = types_1.DendronASTTypes.HTML;
                    node.value = getHTMLToHighlightText(`![[${noteRefText}]]`);
                }
            }
            else if (utils_1.RemarkUtils.isText(node)) {
                // If the backlink location falls within the range of this text node,
                // then proceed with formatting. Note: a text node can span multiple
                // lines if it ends with a '\n'
                if (backlinkLineNumber === ((_c = node.position) === null || _c === void 0 ? void 0 : _c.start.line) &&
                    (node.position.end.column > _opts.location.start.column ||
                        node.position.end.line > _opts.location.start.line) &&
                    (node.position.start.column < _opts.location.end.column ||
                        node.position.start.line < _opts.location.end.line)) {
                    const contents = node.value;
                    const prefix = contents.substring(0, _opts.location.start.column - 1);
                    const candidate = contents.substring(_opts.location.start.column - 1, _opts.location.end.column - 1);
                    const suffix = contents.substring(_opts.location.end.column - 1, contents.length);
                    node.type = types_1.DendronASTTypes.HTML;
                    node.value = `${prefix}${getHTMLToHighlightText(candidate)}${suffix}`;
                    return index;
                }
            }
            else if (utils_1.RemarkUtils.isHashTag(node) || utils_1.RemarkUtils.isUserTag(node)) {
                if (backlinkLineNumber === ((_d = node.position) === null || _d === void 0 ? void 0 : _d.start.line) &&
                    node.position.start.column === _opts.location.start.column) {
                    node.type = types_1.DendronASTTypes.HTML;
                    node.value = getHTMLToHighlightText(node.value);
                }
            }
            return;
        });
        // In the third visit, add the contextual line marker information
        (0, unist_util_visit_1.default)(tree, [types_1.DendronASTTypes.ROOT], (node, _index, _parent) => {
            if (!utils_1.RemarkUtils.isRoot(node) || !node.position) {
                return;
            }
            const lowerBoundText = lowerLineLimit <= documentBodyStartLine
                ? "Start of Note"
                : `Line ${lowerLineLimit - 1}`;
            const lowerBoundParagraph = {
                type: types_1.DendronASTTypes.PARAGRAPH,
                children: [
                    {
                        type: types_1.DendronASTTypes.HTML,
                        value: `--- <i>${lowerBoundText}</i> ---`,
                    },
                ],
            };
            node.children.unshift(lowerBoundParagraph);
            const upperBoundText = upperLineLimit >= documentEndLine
                ? "End of Note"
                : `Line ${upperLineLimit + 1}`;
            const upperBoundParagraph = {
                type: types_1.DendronASTTypes.PARAGRAPH,
                children: [
                    {
                        type: types_1.DendronASTTypes.HTML,
                        value: `--- <i>${upperBoundText}</i> ---`,
                    },
                ],
            };
            node.children.push(upperBoundParagraph);
        });
    }
    return transformer;
}
exports.backlinksHover = backlinksHover;
function getHTMLToHighlightText(input) {
    return `<span style="color:#000;background-color:#FFFF00;">${input}</span>`;
}
//# sourceMappingURL=backlinksHover.js.map