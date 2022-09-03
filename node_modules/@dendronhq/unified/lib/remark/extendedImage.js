"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedImage = exports.extendedImage2html = exports.extendedImage2htmlRaw = exports.matchExtendedImage = exports.EXTENDED_IMAGE_REGEX_LOOSE = exports.EXTENDED_IMAGE_REGEX = void 0;
const lodash_1 = __importDefault(require("lodash"));
const common_all_1 = require("@dendronhq/common-all");
const types_1 = require("../types");
const mdast_builder_1 = require("mdast-builder");
const js_yaml_1 = __importDefault(require("js-yaml"));
const utilsv5_1 = require("../utilsv5");
exports.EXTENDED_IMAGE_REGEX = /^!\[(?<alt>[^[\]]*)\]\((?<url>.*)\)(?<props>{[^{}]*})/;
exports.EXTENDED_IMAGE_REGEX_LOOSE = /!\[(?<alt>[^[\]]*)\]\((?<url>.*)\)(?<props>{[^{}]*})/;
const matchExtendedImage = (text, matchLoose = true) => {
    var _a;
    const match = (matchLoose ? exports.EXTENDED_IMAGE_REGEX_LOOSE : exports.EXTENDED_IMAGE_REGEX).exec(text);
    if (match && ((_a = match.groups) === null || _a === void 0 ? void 0 : _a.url) && match.groups)
        return match[1];
    return undefined;
};
exports.matchExtendedImage = matchExtendedImage;
const plugin = function (opts) {
    attachParser(this);
    if (this.Compiler != null) {
        attachCompiler(this, opts);
    }
};
exports.extendedImage = plugin;
function attachParser(proc) {
    function locator(value, fromIndex) {
        return value.indexOf("!", fromIndex);
    }
    function inlineTokenizer(eat, value) {
        var _a;
        const match = exports.EXTENDED_IMAGE_REGEX.exec(value);
        if (match && ((_a = match.groups) === null || _a === void 0 ? void 0 : _a.url)) {
            let props = {};
            try {
                props = js_yaml_1.default.load(match.groups.props);
            }
            catch {
                // Reject bad props so that it falls back to a regular image
                return;
            }
            return eat(match[0])({
                type: types_1.DendronASTTypes.EXTENDED_IMAGE,
                // @ts-ignore
                value,
                url: match.groups.url,
                alt: match.groups.alt,
                props,
            });
        }
        return;
    }
    inlineTokenizer.locator = locator;
    const Parser = proc.Parser;
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;
    inlineTokenizers.extendedImage = inlineTokenizer;
    inlineMethods.splice(inlineMethods.indexOf("link"), 0, "extendedImage");
}
function attachCompiler(proc, _opts) {
    const Compiler = proc.Compiler;
    const visitors = Compiler.prototype.visitors;
    if (visitors) {
        visitors.extendedImage = function (node) {
            const { dest } = utilsv5_1.MDUtilsV5.getProcData(proc);
            const alt = node.alt ? node.alt : "";
            switch (dest) {
                case types_1.DendronASTDest.MD_DENDRON:
                    return `![${alt}](${node.url})${lodash_1.default.trim(js_yaml_1.default.dump(node.props, {
                        /* Inline-only so we get JSON style {foo: bar} */
                        flowLevel: 0,
                    }))}`;
                case types_1.DendronASTDest.MD_REGULAR:
                    return `![${alt}](${node.url})`;
                case types_1.DendronASTDest.MD_ENHANCED_PREVIEW:
                    return extendedImage2htmlRaw(node);
                default:
                    throw new common_all_1.DendronError({
                        message: "Unable to render extended image",
                    });
            }
        };
    }
}
const ALLOWED_STYLE_PROPS = new Set([
    "width",
    "height",
    "float",
    "border",
    "margin",
    "padding",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "display",
    "opacity",
    "outline",
    "rotate",
    "transition",
    "transform-origin",
    "transform",
    "z-index",
]);
function extendedImage2htmlRaw(node, _opts) {
    const stylesList = [];
    const nodePropsList = [];
    for (const [prop, value] of Object.entries(node.props)) {
        if (ALLOWED_STYLE_PROPS.has(prop))
            stylesList.push(`${prop}:${value};`);
    }
    nodePropsList.push(`src="${node.url}"`);
    if (node.alt)
        nodePropsList.push(`alt="${node.alt}"`);
    return `<img ${nodePropsList.join(" ")} style="${stylesList.join("")}">`;
}
exports.extendedImage2htmlRaw = extendedImage2htmlRaw;
function extendedImage2html(node, opts) {
    return (0, mdast_builder_1.html)(extendedImage2htmlRaw(node, opts));
}
exports.extendedImage2html = extendedImage2html;
//# sourceMappingURL=extendedImage.js.map