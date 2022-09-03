"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateNoteError = exports.EngineInitErrorType = void 0;
const constants_1 = require("../constants");
const error_1 = require("../error");
const vault_1 = require("../vault");
/** The error codes of errors that can occur during engine init. */
var EngineInitErrorType;
(function (EngineInitErrorType) {
    EngineInitErrorType["DUPLICATE_NOTE_ID"] = "duplicate note id";
})(EngineInitErrorType = exports.EngineInitErrorType || (exports.EngineInitErrorType = {}));
/** A duplicate note ID error.
 *
 * Note IDs must be unique, duplicate note IDs can cause issues in many parts of
 * Dendron. This error occurs when a duplicate note ID is detected during engine
 * init. It's non-fatal because most of Dendron will still function after this
 * error.
 */
class DuplicateNoteError extends error_1.DendronError {
    constructor(opts) {
        super({
            ...opts,
            severity: constants_1.ERROR_SEVERITY.MINOR,
            message: `Notes ${opts.noteA.fname} in ${vault_1.VaultUtils.getName(opts.noteA.vault)} and ${opts.noteB.fname} in ${vault_1.VaultUtils.getName(opts.noteB.vault)} have duplicate IDs.`,
            code: EngineInitErrorType.DUPLICATE_NOTE_ID,
        });
        this.noteA = {
            fname: opts.noteA.fname,
            vault: opts.noteA.vault,
        };
        this.noteB = {
            fname: opts.noteB.fname,
            vault: opts.noteB.vault,
        };
    }
    static isDuplicateNoteError(error) {
        return error.code === EngineInitErrorType.DUPLICATE_NOTE_ID;
    }
}
exports.DuplicateNoteError = DuplicateNoteError;
//# sourceMappingURL=errorTypes.js.map