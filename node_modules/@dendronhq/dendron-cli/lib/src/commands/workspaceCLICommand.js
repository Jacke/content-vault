"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceCLICommand = exports.WorkspaceCommands = void 0;
const engine_server_1 = require("@dendronhq/engine-server");
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("./base");
const utils_1 = require("./utils");
var WorkspaceCommands;
(function (WorkspaceCommands) {
    WorkspaceCommands["PULL"] = "pull";
    WorkspaceCommands["PUSH"] = "push";
    WorkspaceCommands["ADD_AND_COMMIT"] = "addAndCommit";
    WorkspaceCommands["SYNC"] = "sync";
    WorkspaceCommands["REMOVE_CACHE"] = "removeCache";
    WorkspaceCommands["INIT"] = "init";
    WorkspaceCommands["INFO"] = "info";
})(WorkspaceCommands = exports.WorkspaceCommands || (exports.WorkspaceCommands = {}));
class WorkspaceCLICommand extends base_1.CLICommand {
    constructor() {
        super({ name: "workspace <cmd>", desc: "workspace related commands" });
    }
    buildArgs(args) {
        super.buildArgs(args);
        (0, utils_1.setupEngineArgs)(args);
        args.positional("cmd", {
            describe: "a command to run",
            choices: Object.values(WorkspaceCommands),
            type: "string",
        });
    }
    async enrichArgs(args) {
        this.addArgsToPayload({ cmd: args.cmd });
        const engineOpts = lodash_1.default.defaults(args, { init: false });
        const engineArgs = await (0, utils_1.setupEngine)(engineOpts);
        return { data: { ...args, ...engineArgs } };
    }
    async execute(opts) {
        const { cmd, wsRoot, engine } = opts;
        try {
            switch (cmd) {
                case WorkspaceCommands.PULL: {
                    const ws = new engine_server_1.WorkspaceService({ wsRoot });
                    await ws.pullVaults();
                    break;
                }
                case WorkspaceCommands.INIT: {
                    const ws = new engine_server_1.WorkspaceService({ wsRoot });
                    const out = await ws.initialize();
                    const engineOut = await (engine === null || engine === void 0 ? void 0 : engine.init());
                    if (engineOut === null || engineOut === void 0 ? void 0 : engineOut.error) {
                        this.printError(engineOut.error);
                    }
                    return { data: out };
                }
                case WorkspaceCommands.INFO: {
                    const resp = await (engine === null || engine === void 0 ? void 0 : engine.info());
                    // eslint-disable-next-line no-console
                    console.log(resp);
                    break;
                }
                case WorkspaceCommands.ADD_AND_COMMIT: {
                    const ws = new engine_server_1.WorkspaceService({ wsRoot });
                    if (!engine) {
                        this.printError("Can't find the engine");
                        process.exit(1);
                    }
                    await ws.commitAndAddAll({ engine: engine });
                    break;
                }
                case WorkspaceCommands.PUSH: {
                    const ws = new engine_server_1.WorkspaceService({ wsRoot });
                    await ws.pushVaults();
                    break;
                }
                case WorkspaceCommands.REMOVE_CACHE: {
                    const ws = new engine_server_1.WorkspaceService({ wsRoot });
                    await ws.removeVaultCaches();
                    this.print("caches removed");
                    break;
                }
                case WorkspaceCommands.SYNC: {
                    const ws = new engine_server_1.WorkspaceService({ wsRoot });
                    this.print("commit and add...");
                    await ws.commitAndAddAll({ engine: engine });
                    this.print("pull...");
                    await ws.pullVaults();
                    this.print("push...");
                    await ws.pushVaults();
                    this.print("done...");
                    break;
                }
                default: {
                    throw Error("bad option");
                }
            }
            return { error: undefined };
        }
        catch (err) {
            this.L.error(err);
            return { error: err };
        }
        finally {
            if (opts.server.close) {
                opts.server.close();
            }
        }
    }
}
exports.WorkspaceCLICommand = WorkspaceCLICommand;
//# sourceMappingURL=workspaceCLICommand.js.map