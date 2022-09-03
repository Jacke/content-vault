"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateBlockAnchor = void 0;
const common_all_1 = require("@dendronhq/common-all");
const utils_1 = require("./utils");
const decorateBlockAnchor = (opts) => {
    const { node: blockAnchor } = opts;
    const { position } = blockAnchor;
    const decoration = {
        type: utils_1.DECORATION_TYPES.blockAnchor,
        range: (0, common_all_1.position2VSCodeRange)(position),
    };
    return {
        decorations: [decoration],
        errors: [],
    };
};
exports.decorateBlockAnchor = decorateBlockAnchor;
//# sourceMappingURL=blockAnchors.js.map