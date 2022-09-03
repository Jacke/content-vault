"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUser = void 0;
const types_1 = require("./types");
class DUser {
    constructor(username) {
        this.username = username;
    }
    static createAnonymous() {
        return new DUser(types_1.DendronUserSpecial.anonymous);
    }
    canPushVault(vault) {
        if (vault.noAutoPush) {
            return false;
        }
        if (!vault.userPermission) {
            return true;
        }
        if (vault.userPermission.write[0] === types_1.DendronUserSpecial.everyone ||
            vault.userPermission.write.includes(this.username)) {
            return true;
        }
        return false;
    }
}
exports.DUser = DUser;
//# sourceMappingURL=user.js.map