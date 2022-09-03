"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAULT_SYNC_MODES = void 0;
const base_1 = require("../../types/configs/base");
exports.VAULT_SYNC_MODES = {
    [base_1.VaultSyncModeEnum.skip]: {
        value: base_1.VaultSyncModeEnum.skip,
        label: "Skip",
        desc: "Skip entirely. You must manage the repository manually.",
    },
    [base_1.VaultSyncModeEnum.noPush]: {
        value: base_1.VaultSyncModeEnum.noPush,
        label: "No Push",
        desc: "Commit any changes and pull updates, but don't push. You can watch the repository and make local changes without sharing them back",
    },
    [base_1.VaultSyncModeEnum.noCommit]: {
        value: base_1.VaultSyncModeEnum.noCommit,
        label: "No Commit",
        desc: "Pull and push updates if the workspace is clean, but don't commit. You manually commit your local changes, but automatically share them once you committed.",
    },
    [base_1.VaultSyncModeEnum.sync]: {
        value: base_1.VaultSyncModeEnum.sync,
        label: "Sync",
        desc: "Commit changes, and pull and push updates. Treats workspace vaults like regular vaults.",
    },
};
//# sourceMappingURL=base.js.map