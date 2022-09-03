"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchv2 = exports.express = exports.SubProcessExitType = exports.ServerUtils = void 0;
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const core_1 = require("./core");
var utils_1 = require("./utils");
Object.defineProperty(exports, "ServerUtils", { enumerable: true, get: function () { return utils_1.ServerUtils; } });
Object.defineProperty(exports, "SubProcessExitType", { enumerable: true, get: function () { return utils_1.SubProcessExitType; } });
function launchv2(opts) {
    const ctx = "launch";
    const listenPort = (opts === null || opts === void 0 ? void 0 : opts.port) || 0;
    const LOG_DST = (opts === null || opts === void 0 ? void 0 : opts.logPath) ? opts.logPath : "stdout";
    (0, core_1.configureLogger)({ logPath: LOG_DST });
    return new Promise((resolve) => {
        // eslint-disable-next-line global-require
        const appModule = require("./Server").appModule;
        const app = appModule({
            logPath: LOG_DST,
            nextServerUrl: opts === null || opts === void 0 ? void 0 : opts.nextServerUrl,
            nextStaticRoot: opts === null || opts === void 0 ? void 0 : opts.nextStaticRoot,
            googleOauthClientId: opts === null || opts === void 0 ? void 0 : opts.googleOauthClientId,
            googleOauthClientSecret: opts === null || opts === void 0 ? void 0 : opts.googleOauthClientSecret,
        });
        const serverSockets = new Set();
        const server = app.listen(listenPort, "localhost", () => {
            const port = server.address().port;
            (0, core_1.getLogger)().info({ ctx, msg: "exit", port, LOG_DST, root: __dirname });
            // delete all active sockets on server close
            server.on("connection", (socket) => {
                serverSockets.add(socket);
                socket.on("close", () => {
                    serverSockets.delete(socket);
                });
            });
            resolve({ port, server, serverSockets });
        });
    });
}
exports.launchv2 = launchv2;
//# sourceMappingURL=index.js.map