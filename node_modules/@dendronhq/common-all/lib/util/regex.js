"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVSCodeCommandUri = exports.isWebUri = exports.containsNonDendronUri = exports.uriRegex = void 0;
const lodash_1 = __importDefault(require("lodash"));
/** Kind-of parses a URI and extracts the scheme. Not an actual parser and will accept invalid URIs. */
exports.uriRegex = /^(?<scheme>[\w+.-]+):(\/\/)?\S+/;
/** Returns true if this is a non-dendron uri, false if it is dendron://, undefined if it's not a URI */
const containsNonDendronUri = (uri) => {
    var _a;
    const groups = (_a = exports.uriRegex.exec(uri)) === null || _a === void 0 ? void 0 : _a.groups;
    if (lodash_1.default.isUndefined(groups) || lodash_1.default.isUndefined(groups.scheme))
        return undefined;
    if (groups.scheme === "dendron")
        return false;
    return true;
};
exports.containsNonDendronUri = containsNonDendronUri;
function isWebUri(uri) {
    var _a, _b;
    const scheme = (_b = (_a = uri.match(exports.uriRegex)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.scheme;
    if (scheme === "http" || scheme === "https")
        return true;
    return false;
}
exports.isWebUri = isWebUri;
/**
 * Given a uri, determine if it is a [command uri](https://code.visualstudio.com/api/extension-guides/command#command-uris)
 * Command uris have the following scheme
 * `command:{uri}`
 */
function isVSCodeCommandUri(uri) {
    var _a, _b;
    const scheme = (_b = (_a = uri.match(exports.uriRegex)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.scheme;
    if (scheme === "command")
        return true;
    return false;
}
exports.isVSCodeCommandUri = isVSCodeCommandUri;
//# sourceMappingURL=regex.js.map