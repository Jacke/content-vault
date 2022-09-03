"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticSeverity = exports.isDisposable = void 0;
const isDisposable = (cmd) => {
    return cmd.dispose !== undefined;
};
exports.isDisposable = isDisposable;
/** Mirrors VSCode's `DiagnosticSeverity` */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    DiagnosticSeverity[DiagnosticSeverity["Error"] = 0] = "Error";
    DiagnosticSeverity[DiagnosticSeverity["Warning"] = 1] = "Warning";
    DiagnosticSeverity[DiagnosticSeverity["Information"] = 2] = "Information";
    DiagnosticSeverity[DiagnosticSeverity["Hint"] = 3] = "Hint";
})(DiagnosticSeverity = exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));
//# sourceMappingURL=compat.js.map