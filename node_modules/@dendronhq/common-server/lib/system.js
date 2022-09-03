"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDurationMilliseconds = exports.getOS = void 0;
const process_1 = __importDefault(require("process"));
const os_1 = __importDefault(require("os"));
function getOS() {
    return os_1.default.platform();
}
exports.getOS = getOS;
function getDurationMilliseconds(start) {
    const [secs, nanosecs] = process_1.default.hrtime(start);
    return secs * 1000 + Math.floor(nanosecs / 1000000);
}
exports.getDurationMilliseconds = getDurationMilliseconds;
//# sourceMappingURL=system.js.map