"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUtils = void 0;
const common_all_1 = require("@dendronhq/common-all");
const common_server_1 = require("@dendronhq/common-server");
const fs_extra_1 = __importDefault(require("fs-extra"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const site_1 = require("../topics/site");
const workspaceServiceInterface_1 = require("./workspaceServiceInterface");
class WorkspaceUtils {
    static isWorkspaceConfig(val) {
        if (lodash_1.default.isNull(val)) {
            return false;
        }
        return true;
    }
    static async getCodeWorkspaceSettings(wsRoot) {
        const wsConfigPath = path_1.default.join(wsRoot, common_all_1.CONSTANTS.DENDRON_WS_NAME);
        let wsConfig;
        try {
            wsConfig = await (0, common_server_1.readJSONWithComments)(wsConfigPath);
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.DOES_NOT_EXIST,
                    message: `Missing code-workspace file ${wsConfigPath}`,
                    payload: err,
                }),
            };
        }
        if (!this.isWorkspaceConfig(wsConfig)) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.INVALID_CONFIG,
                    message: `Bad code-workspace file ${wsConfigPath}`,
                }),
            };
        }
        else {
            return {
                data: wsConfig,
            };
        }
    }
    static getCodeWorkspaceSettingsSync(wsRoot) {
        const wsConfigPath = path_1.default.join(wsRoot, common_all_1.CONSTANTS.DENDRON_WS_NAME);
        try {
            const wsConfig = (0, common_server_1.readJSONWithCommentsSync)(wsConfigPath);
            if (!this.isWorkspaceConfig(wsConfig)) {
                return {
                    error: common_all_1.DendronError.createFromStatus({
                        status: common_all_1.ERROR_STATUS.INVALID_CONFIG,
                        message: `Bad code-workspace file ${wsConfigPath}`,
                    }),
                };
            }
            else {
                return {
                    data: wsConfig,
                };
            }
        }
        catch (err) {
            return {
                error: common_all_1.DendronError.createFromStatus({
                    status: common_all_1.ERROR_STATUS.INVALID_CONFIG,
                    message: `Missing code-workspace file ${wsConfigPath}`,
                }),
            };
        }
    }
    /** Finds the workspace type using the VSCode plugin workspace variables. */
    static async getWorkspaceType({ workspaceFolders, workspaceFile, }) {
        if (!lodash_1.default.isUndefined(workspaceFile) &&
            path_1.default.basename(workspaceFile.fsPath) === common_all_1.CONSTANTS.DENDRON_WS_NAME) {
            return common_all_1.WorkspaceType.CODE;
        }
        if (!lodash_1.default.isUndefined(workspaceFolders)) {
            const rootFolder = await this.findWSRootsInWorkspaceFolders(workspaceFolders);
            if (!lodash_1.default.isEmpty(rootFolder))
                return common_all_1.WorkspaceType.NATIVE;
        }
        return common_all_1.WorkspaceType.NONE;
    }
    /** Finds the workspace type by analyzing the given directory. Use if plugin is not available.
     * @returns WorkspaceType
     */
    static async getWorkspaceTypeFromDir(dir) {
        if (fs_extra_1.default.pathExistsSync(path_1.default.join(dir, common_all_1.CONSTANTS.DENDRON_WS_NAME))) {
            return common_all_1.WorkspaceType.CODE;
        }
        const wsRoot = await (0, common_server_1.findDownTo)({
            base: dir,
            fname: common_all_1.CONSTANTS.DENDRON_CONFIG_FILE,
            returnDirPath: true,
        });
        if (!wsRoot)
            return common_all_1.WorkspaceType.NONE;
        if (fs_extra_1.default.pathExistsSync(path_1.default.join(wsRoot, common_all_1.CONSTANTS.DENDRON_CONFIG_FILE))) {
            return common_all_1.WorkspaceType.NATIVE;
        }
        return common_all_1.WorkspaceType.NONE;
    }
    static async updateCodeWorkspaceSettings({ wsRoot, updateCb, }) {
        const maybeSettings = WorkspaceUtils.getCodeWorkspaceSettingsSync(wsRoot);
        if (maybeSettings.error) {
            throw common_all_1.DendronError.createFromStatus({
                status: common_all_1.ERROR_STATUS.INVALID_STATE,
                message: "no workspace file found",
            });
        }
        const settings = updateCb(maybeSettings.data);
        await this.writeCodeWorkspaceSettings({ wsRoot, settings });
        return settings;
    }
    static async writeCodeWorkspaceSettings({ settings, wsRoot, }) {
        return (0, common_server_1.writeJSONWithComments)(path_1.default.join(wsRoot, "dendron.code-workspace"), settings);
    }
    /**
     * Find wsRoot if exists
     * @returns
     */
    static findWSRoot() {
        const cwd = process.cwd();
        const configPath = (0, common_server_1.findUpTo)({
            base: cwd,
            fname: "dendron.yml",
            maxLvl: 3,
            returnDirPath: true,
        });
        return configPath;
    }
    static async findWSRootsInWorkspaceFolders(workspaceFolders) {
        const folders = (0, common_server_1.uniqueOutermostFolders)(workspaceFolders.map((folder) => folder.uri.fsPath));
        const dendronWorkspaceFolders = await Promise.all(folders.map((folder) => (0, common_server_1.findDownTo)({
            base: folder,
            fname: common_all_1.CONSTANTS.DENDRON_CONFIG_FILE,
            returnDirPath: true,
        })));
        return dendronWorkspaceFolders.filter(common_all_1.isNotUndefined);
    }
    /**
     * Check if a file is a dendron note (vs a regular file or something else entirely)
     */
    static async isDendronNote({ wsRoot, vaults, fpath, }) {
        // check if we have markdown file
        if (!fpath.endsWith(".md")) {
            return false;
        }
        // if markdown file, check if it is in a dendron vault
        if (!WorkspaceUtils.isPathInWorkspace({ wsRoot, vaults, fpath })) {
            return false;
        }
        // if markdown file, does it have frontmatter? check for `---` at beginning of file
        return ((await common_server_1.FileUtils.matchFilePrefix({ fpath, prefix: "---" })).data || false);
    }
    static isNativeWorkspace(workspace) {
        return workspace.type === common_all_1.WorkspaceType.NATIVE;
    }
    /**
     * Check if path is in workspace
     * @returns
     */
    static isPathInWorkspace({ wsRoot, vaults, fpath, }) {
        try {
            common_all_1.VaultUtils.getVaultByFilePath({
                vaults,
                wsRoot,
                fsPath: fpath,
            });
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Return true if contents of note is different from engine
     * @param param0
     * @returns
     */
    static noteContentChanged({ content, note, }) {
        const noteHash = (0, common_all_1.genHash)(content);
        if (lodash_1.default.isUndefined(note.contentHash)) {
            return true;
        }
        return noteHash !== note.contentHash;
    }
    /**
     * Generate url for given note or return `undefined` if no url is specified
     * @param opts
     *
     */
    static getNoteUrl(opts) {
        const { config, note, anchor, vault } = opts;
        /**
         * set to true if index node, don't append id at the end
         */
        const { url: root, index } = site_1.SiteUtils.getSiteUrlRootForVault({
            vault,
            config,
        });
        if (!root) {
            throw new common_all_1.DendronError({ message: "no urlRoot set" });
        }
        // if we have a note, see if we are at index
        const isIndex = lodash_1.default.isUndefined(note)
            ? false
            : site_1.SiteUtils.isIndexNote({
                indexNote: index,
                note,
            });
        const pathValue = note.id;
        const siteUrlPath = site_1.SiteUtils.getSiteUrlPathForNote({
            addPrefix: true,
            pathValue,
            config,
            pathAnchor: anchor,
        });
        const link = isIndex ? root : [root, siteUrlPath].join("");
        return link;
    }
    /**
     * @param results
     * @returns number of repos that has Sync Action Status done.
     */
    static getCountForStatusDone(results) {
        return this.count(results, workspaceServiceInterface_1.SyncActionStatus.DONE);
    }
    static count(results, status) {
        return results.filter((result) => result.status === status).length;
    }
    /**
     *
     * @param results
     * @param status
     * @returns name of all the repos with status same as @param status.
     */
    static getFilteredRepoNames(results, status) {
        const matchingResults = results.filter((result) => result.status === status);
        if (matchingResults.length === 0)
            return [];
        return matchingResults.map((result) => {
            // Display the vault names for info/error messages
            if (result.vaults.length === 1) {
                return common_all_1.VaultUtils.getName(result.vaults[0]);
            }
            // But if there's more than one vault in the repo, then use the repo path which is easier to interpret
            return result.repo;
        });
    }
    static async addVaultToWorkspace({ vault, wsRoot, }) {
        const resp = await WorkspaceUtils.getCodeWorkspaceSettings(wsRoot);
        if (resp.error) {
            // If there is no workspace file, just skip updating it. The workspace
            // file is optional with self contained vaults.
            return;
        }
        let wsSettings = resp.data;
        if (!lodash_1.default.find(wsSettings.folders, (ent) => ent.path === common_all_1.VaultUtils.getRelPath(vault))) {
            const vault2Folder = common_all_1.VaultUtils.toWorkspaceFolder(vault);
            const folders = [vault2Folder].concat(wsSettings.folders);
            wsSettings = (0, common_server_1.assignJSONWithComment)({ folders }, wsSettings);
            await WorkspaceUtils.writeCodeWorkspaceSettings({
                settings: wsSettings,
                wsRoot,
            });
        }
        // check for .gitignore
        await common_server_1.GitUtils.addToGitignore({
            addPath: vault.fsPath,
            root: wsRoot,
            noCreateIfMissing: true,
        });
        const vaultDir = path_1.default.join(wsRoot, vault.fsPath);
        fs_extra_1.default.ensureDir(vaultDir);
        await common_server_1.GitUtils.addToGitignore({
            addPath: ".dendron.cache.*",
            root: vaultDir,
        });
        return;
    }
}
exports.WorkspaceUtils = WorkspaceUtils;
//# sourceMappingURL=utils.js.map