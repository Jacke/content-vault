"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vault2Path = void 0;
const vscode_uri_1 = require("vscode-uri");
const vault_1 = require("../vault");
/** Returns the path to where the notes are stored inside the vault.
 *
 * For self contained vaults, this is the `notes` folder inside of the vault.
 * For other vault types, this is the root of the vault itself.
 *
 * If you always need the root of the vault, use {@link pathForVaultRoot} instead.
 */
function vault2Path({ vault, wsRoot }) {
    return vscode_uri_1.Utils.joinPath(wsRoot, vault_1.VaultUtils.getRelPath(vault));
}
exports.vault2Path = vault2Path;
//# sourceMappingURL=vault2Path.js.map