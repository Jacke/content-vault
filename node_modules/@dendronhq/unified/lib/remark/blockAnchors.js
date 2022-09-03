"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockAnchors = exports.blockAnchor2html = exports.blockAnchor2htmlRaw = exports.matchBlockAnchor = exports.BLOCK_LINK_REGEX_LOOSE = exports.BLOCK_LINK_REGEX = void 0;
const common_all_1 = require("@dendronhq/common-all");
const types_1 = require("../types");
const mdast_builder_1 = require("mdast-builder");
const __1 = require("..");
// Letters, digits, dashes, and underscores.
// The underscores are an extension over Obsidian.
// Another extension is that it allows whitespace after the anchor.
exports.BLOCK_LINK_REGEX = /^\^([\w-]+)\w*(\n|$)/;
exports.BLOCK_LINK_REGEX_LOOSE = /\^([\w-]+)/;
/**
 *
 * @param text The text to check if it matches an block anchor.
 * @param matchLoose If true, a block anchor anywhere in the string will match. Otherwise the string must contain only the anchor.
 * @returns The identifier for the match block anchor, or undefined if it did not match.
 */
const matchBlockAnchor = (text, matchLoose = true) => {
    const match = (matchLoose ? exports.BLOCK_LINK_REGEX_LOOSE : exports.BLOCK_LINK_REGEX).exec(text);
    if (match && match.length == 1)
        return match[1];
    return undefined;
};
exports.matchBlockAnchor = matchBlockAnchor;
const plugin = function (opts) {
    attachParser(this);
    if (this.Compiler != null) {
        attachCompiler(this, opts);
    }
};
exports.blockAnchors = plugin;
function attachParser(proc) {
    function locator(value, fromIndex) {
        return value.indexOf("^", fromIndex);
    }
    function inlineTokenizer(eat, value) {
        const match = exports.BLOCK_LINK_REGEX.exec(value);
        if (match) {
            return eat(match[0])({
                type: "blockAnchor",
                // @ts-ignore
                value,
                id: match[1],
            });
        }
        return;
    }
    inlineTokenizer.locator = locator;
    const Parser = proc.Parser;
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;
    inlineTokenizers.blockAnchor = inlineTokenizer;
    inlineMethods.splice(inlineMethods.indexOf("link"), 0, "blockAnchor");
}
function attachCompiler(proc, _opts) {
    const Compiler = proc.Compiler;
    const visitors = Compiler.prototype.visitors;
    if (visitors) {
        visitors.blockAnchor = function (node) {
            const { dest } = __1.MDUtilsV5.getProcData(proc);
            const fullId = node.id;
            switch (dest) {
                case types_1.DendronASTDest.MD_DENDRON:
                    return `^${fullId}`;
                case types_1.DendronASTDest.MD_REGULAR:
                    // Regular markdown has no concept of anchors, so best to strip it out
                    return "";
                case types_1.DendronASTDest.MD_ENHANCED_PREVIEW:
                    return `<a aria-hidden="true" class="block-anchor anchor-heading" id="${fullId}" href="#${fullId}">^${fullId}</a>`;
                default:
                    throw new common_all_1.DendronError({ message: "Unable to render block anchor" });
            }
        };
    }
}
function blockAnchor2htmlRaw(node, _opts) {
    const fullId = `^${node.id}`;
    return (`<a aria-hidden="true" class="block-anchor anchor-heading icon-link" id="${fullId}" href="#${fullId}">` +
        "</a>");
}
exports.blockAnchor2htmlRaw = blockAnchor2htmlRaw;
function blockAnchor2html(node, opts) {
    return (0, mdast_builder_1.html)(blockAnchor2htmlRaw(node, opts));
}
exports.blockAnchor2html = blockAnchor2html;
//# sourceMappingURL=blockAnchors.js.map