"use strict";
// import pino from "pino";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAndThrow = exports.pino = exports.createDisposableLogger = exports.createLogger = exports.Logger = void 0;
const common_all_1 = require("@dendronhq/common-all");
const pino_1 = __importDefault(require("pino"));
exports.pino = pino_1.default;
class Logger {
    constructor(opts) {
        this.debug = (msg) => {
            this._log(msg);
        };
        this.info = (msg) => {
            this._log(msg);
        };
        this.error = (msg) => {
            this._log(msg);
        };
        this.name = opts.name;
        this.level = opts.level;
    }
    _log(msg) {
        let ctx = "";
        if (msg.ctx) {
            ctx = msg.ctx;
        }
        // eslint-disable-next-line no-console
        console.log(this.name, ctx, msg);
    }
}
exports.Logger = Logger;
/** @deprecated Avoid using this function as it may leak file descriptors. Please see createDisposableLogger instead. */
function createLogger(name, dest, 
// TODO: not using pretty option
opts) {
    const level = (opts === null || opts === void 0 ? void 0 : opts.lvl) || (0, common_all_1.env)("LOG_LEVEL", { shouldThrow: false }) || "info";
    const nameClean = name || (0, common_all_1.env)("LOG_NAME", { shouldThrow: false }) || "logger";
    const logDst = dest || (0, common_all_1.env)("LOG_DST", { shouldThrow: false }) || "stdout";
    const pinoOpts = { name: nameClean, level };
    if (logDst === "stdout") {
        return (0, pino_1.default)(pinoOpts);
    }
    else {
        return (0, pino_1.default)(pino_1.default.destination(logDst)).child(pinoOpts);
    }
}
exports.createLogger = createLogger;
/** Create a logger. The logger **must** be disposed after being used if the function returned a dispose callback, otherwise it will leak file descriptors and may lead to crashes. */
function createDisposableLogger(name, dest, 
// TODO: not using pretty option
opts) {
    const level = (opts === null || opts === void 0 ? void 0 : opts.lvl) || (0, common_all_1.env)("LOG_LEVEL", { shouldThrow: false }) || "info";
    const nameClean = name || (0, common_all_1.env)("LOG_NAME", { shouldThrow: false }) || "logger";
    const logDst = dest || (0, common_all_1.env)("LOG_DST", { shouldThrow: false }) || "stdout";
    const pinoOpts = { name: nameClean, level };
    if (logDst === "stdout") {
        return { logger: (0, pino_1.default)(pinoOpts), dispose: () => { } };
    }
    else {
        const destination = pino_1.default.destination(logDst);
        return {
            logger: (0, pino_1.default)(destination).child(pinoOpts),
            dispose: () => destination.destroy(),
        };
    }
}
exports.createDisposableLogger = createDisposableLogger;
function logAndThrow(logger, msg) {
    logger.error(msg);
    throw JSON.stringify(msg);
}
exports.logAndThrow = logAndThrow;
//# sourceMappingURL=logger.js.map