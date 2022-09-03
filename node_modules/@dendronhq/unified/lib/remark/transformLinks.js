"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformLinks = void 0;
const unist_util_visit_1 = __importDefault(require("unist-util-visit"));
const types_1 = require("../types");
/**
 * Used from renaming wikilinks
 */
function plugin(opts) {
    // @ts-ignore
    const proc = this;
    function transformer(tree, _file) {
        (0, unist_util_visit_1.default)(tree, (node, _idx, _parent) => {
            if (node.type === types_1.DendronASTTypes.WIKI_LINK) {
                let cnode = node;
                if (cnode.value.toLowerCase() === opts.from.fname.toLowerCase()) {
                    cnode.value = opts.to.fname;
                    // if alias the same, change that to
                    if (cnode.data.alias.toLowerCase() === opts.from.fname.toLowerCase()) {
                        cnode.data.alias = opts.to.fname;
                    }
                }
            }
            if (node.type === types_1.DendronASTTypes.REF_LINK_V2) {
                let cnode = node;
                if (cnode.data.link.from.fname.toLowerCase() ===
                    opts.from.fname.toLowerCase()) {
                    cnode.data.link.from.fname = opts.to.fname;
                }
            }
        });
        return tree;
    }
    return transformer;
}
exports.transformLinks = plugin;
//# sourceMappingURL=transformLinks.js.map