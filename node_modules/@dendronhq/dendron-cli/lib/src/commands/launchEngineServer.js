"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchEngineServerCommand = void 0;
const api_server_1 = require("@dendronhq/api-server");
const common_all_1 = require("@dendronhq/common-all");
const common_server_1 = require("@dendronhq/common-server");
const engine_server_1 = require("@dendronhq/engine-server");
const lodash_1 = __importDefault(require("lodash"));
const cli_1 = require("../utils/cli");
const base_1 = require("./base");
class LaunchEngineServerCommand extends base_1.CLICommand {
    constructor() {
        super({
            name: "launchEngineServer",
            desc: "launch instance of dendron engine",
        });
    }
    buildArgs(args) {
        super.buildArgs(args);
        args.option("port", {
            describe: "port to launch server",
            type: "number",
        });
        args.option("init", {
            describe: "initialize server",
            type: "boolean",
        });
        args.option("noWritePort", {
            describe: "don't write the port to a file",
            type: "boolean",
        });
        args.option("fast", {
            describe: "launch engine without indexing",
            type: "boolean",
        });
    }
    async enrichArgs(args) {
        const ctx = "enrichArgs";
        const { port, init, noWritePort, fast } = lodash_1.default.defaults(args, {
            init: false,
            noWritePort: false,
            fast: false,
        });
        const wsRoot = (0, common_server_1.resolvePath)(args.wsRoot, process.cwd());
        const ws = new engine_server_1.WorkspaceService({ wsRoot });
        const { dev } = ws.config;
        const vaults = common_all_1.ConfigUtils.getVaults(ws.config);
        const vaultPaths = vaults.map((v) => (0, common_server_1.resolvePath)(v.fsPath, wsRoot));
        // launches engine server in a separate process
        const { port: _port, server, serverSockets, } = await (0, api_server_1.launchv2)({
            port,
            logPath: process.env["LOG_DST"],
            logLevel: process.env["LOG_LEVEL"] || "error",
            nextServerUrl: dev === null || dev === void 0 ? void 0 : dev.nextServerUrl,
            nextStaticRoot: dev === null || dev === void 0 ? void 0 : dev.nextStaticRoot,
        });
        ws.writeMeta({ version: cli_1.CLIUtils.getClientVersion() });
        if (!noWritePort) {
            engine_server_1.EngineUtils.writeEnginePortForCLI({ port: _port, wsRoot });
        }
        const engine = engine_server_1.DendronEngineClient.create({
            port: _port,
            vaults,
            ws: wsRoot,
        });
        if (init) {
            this.L.info({ ctx, msg: "pre:engine.init" });
            const out = await engine.init();
            // These events will only upload if the upload action completes before the
            // CLI command completes. They are uploaded on a best effort basis.
            // engine.onEngineNoteStateChanged((entries) => {
            //   const createCount = extractNoteChangeEntriesByType(
            //     entries,
            //     "create"
            //   ).length;
            //   const updateCount = extractNoteChangeEntriesByType(
            //     entries,
            //     "update"
            //   ).length;
            //   const deleteCount = extractNoteChangeEntriesByType(
            //     entries,
            //     "delete"
            //   ).length;
            //   CLIAnalyticsUtils.track(EngagementEvents.EngineStateChanged, {
            //     created: createCount,
            //     updated: updateCount,
            //     deleted: deleteCount,
            //   });
            // });
            if (out.error) {
                this.printError(out.error);
            }
        }
        return {
            data: {
                ...args,
                engine,
                wsRoot,
                init,
                fast,
                vaults: vaultPaths,
                port: _port,
                server,
                serverSockets,
            },
        };
    }
    async execute(opts) {
        const { port, server } = opts;
        return {
            port: lodash_1.default.toInteger(port),
            server,
        };
    }
}
exports.LaunchEngineServerCommand = LaunchEngineServerCommand;
//# sourceMappingURL=launchEngineServer.js.map