"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.prod = exports.dev = exports.local = exports.test = exports.global = void 0;
exports.global = {};
exports.test = {
    COGNITO_POOL_ID: "TODO",
    COGNITO_CLIENT_ID: "TODO",
    SEGMENT_WEB_KEY: "TODO",
    SEGMENT_VSCODE_KEY: "TODO",
};
exports.local = {
    COGNITO_POOL_ID: "TODO",
    COGNITO_CLIENT_ID: "TODO",
    SEGMENT_WEB_KEY: "TODO",
    SEGMENT_VSCODE_KEY: "TODO",
};
exports.dev = {
    COGNITO_POOL_ID: "us-west-2_X6icVFghe",
    COGNITO_CLIENT_ID: "19vkp969ss471e424pfh7trq33",
    SEGMENT_WEB_KEY: "K62tHP5N3jhd2i1tUNuSyEpPoJmG1tZo",
    SEGMENT_VSCODE_KEY: "Gh1H6hRdVHRIbnjWtw9DBgoGoBSUdjME",
};
exports.prod = {
    COGNITO_POOL_ID: "us-west-2_X6icVFghe",
    COGNITO_CLIENT_ID: "19vkp969ss471e424pfh7trq33",
    SEGMENT_WEB_KEY: "TODO",
    SEGMENT_VSCODE_KEY: "TVO9BpMkMjzJcHaG3nZb5xc9Gm6BGsdB",
};
exports.config = { global: exports.global, test: exports.test, local: exports.local, dev: exports.dev, prod: exports.prod };
//# sourceMappingURL=config.js.map