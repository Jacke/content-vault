"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrontmatterTags = exports.parseFrontmatter = exports.visitYamlUnist = exports.isYamlString = exports.isQuoteDouble = exports.isQuoteSingle = exports.isPlain = exports.isMappingItem = exports.isYamlUnistParent = void 0;
const yaml_unist_parser_1 = require("yaml-unist-parser");
const lodash_1 = __importDefault(require("lodash"));
function isYamlUnistParent(node) {
    return lodash_1.default.isArray(node === null || node === void 0 ? void 0 : node.children);
}
exports.isYamlUnistParent = isYamlUnistParent;
function isMappingItem(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === "mappingItem";
}
exports.isMappingItem = isMappingItem;
function isPlain(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === "plain";
}
exports.isPlain = isPlain;
function isQuoteSingle(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === "quoteSingle";
}
exports.isQuoteSingle = isQuoteSingle;
function isQuoteDouble(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === "quoteDouble";
}
exports.isQuoteDouble = isQuoteDouble;
function isYamlString(node) {
    return isPlain(node) || isQuoteSingle(node) || isQuoteDouble(node);
}
exports.isYamlString = isYamlString;
/** `unist-util-visit`, kind of, but for YamlUnist.
 *
 * The reason this is duplicated here is that even though YamlUnist is
 * technically Unist compatible, the types don't match so we can't use the unist
 * function.
 */
function visitYamlUnist(node, visitor) {
    const toVisit = lodash_1.default.isArray(node) ? [...node] : [node];
    while (toVisit.length > 0) {
        const item = toVisit.pop();
        if (lodash_1.default.isUndefined(item))
            return;
        const out = visitor(item);
        if (out === false)
            return;
        if (isYamlUnistParent(item)) {
            toVisit.push(...item.children);
        }
    }
}
exports.visitYamlUnist = visitYamlUnist;
/** Get the mapping items (`key: value`) from the frontmatter. */
function parseFrontmatter(frontmatter) {
    var _a, _b, _c;
    const parsed = (0, yaml_unist_parser_1.parse)(lodash_1.default.isString(frontmatter) ? frontmatter : frontmatter.value);
    const mapping = (_c = (_b = (_a = parsed.children[0]) === null || _a === void 0 ? void 0 : _a.children[1]) === null || _b === void 0 ? void 0 : _b.children[0]) === null || _c === void 0 ? void 0 : _c.children;
    return mapping;
}
exports.parseFrontmatter = parseFrontmatter;
function getFrontmatterTags(frontmatter) {
    const tags = [];
    visitYamlUnist(frontmatter, (node) => {
        if (!isMappingItem(node))
            return;
        const [key, value] = node.children;
        let isTags = false;
        visitYamlUnist(key, (keyPlain) => {
            if (!isYamlString(keyPlain))
                return;
            if (keyPlain.value === "tags") {
                isTags = true;
                return false; // stop traversal
            }
            return;
        });
        if (!isTags)
            return;
        visitYamlUnist(value, (valuePlain) => {
            if (!isYamlString(valuePlain))
                return;
            tags.push(valuePlain);
            return;
        });
        return;
    });
    return tags;
}
exports.getFrontmatterTags = getFrontmatterTags;
//# sourceMappingURL=yaml.js.map