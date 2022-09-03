"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DENDRON_CONFIG = void 0;
const global_1 = require("./global");
const commands_1 = require("./commands");
const workspace_1 = require("./workspace");
const preview_1 = require("./preview");
const publishing_1 = require("./publishing");
const dev_1 = require("./dev");
exports.DENDRON_CONFIG = {
    version: {
        label: "Version",
        desc: "Version number for configuration. Automatically set up by plugin during migration.",
    },
    global: global_1.GLOBAL,
    commands: commands_1.COMMANDS,
    workspace: workspace_1.WORKSPACE,
    preview: preview_1.PREVIEW,
    publishing: publishing_1.PUBLISHING,
    dev: dev_1.DEV,
};
//# sourceMappingURL=dendronConfig.js.map