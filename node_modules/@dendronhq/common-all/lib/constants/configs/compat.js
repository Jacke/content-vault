"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompatUtils = exports.CONFIG_TO_MINIMUM_COMPAT_MAPPING = void 0;
const lodash_1 = __importDefault(require("lodash"));
exports.CONFIG_TO_MINIMUM_COMPAT_MAPPING = {
    1: { clientVersion: "0.0.0" },
    2: { clientVersion: "0.63.0" },
    3: { clientVersion: "0.65.0" },
    4: { clientVersion: "0.70.0" },
    5: { clientVersion: "0.83.0", softMapping: true }, // config consolidation (publishing namespace): commented this out because adding this compat mapping would prevent users from keeping the v4 config and still use the cli for publishing. re-enable once we remove backward compatibility.
};
class CompatUtils {
    static isSoftMapping(opts) {
        const softMapping = exports.CONFIG_TO_MINIMUM_COMPAT_MAPPING[opts.configVersion].softMapping;
        return !lodash_1.default.isUndefined(softMapping) && softMapping;
    }
}
exports.CompatUtils = CompatUtils;
//# sourceMappingURL=compat.js.map