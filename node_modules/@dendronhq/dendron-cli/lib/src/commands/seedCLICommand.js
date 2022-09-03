"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCLICommand = void 0;
const common_all_1 = require("@dendronhq/common-all");
const engine_server_1 = require("@dendronhq/engine-server");
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const base_1 = require("./base");
const utils_1 = require("./utils");
class SeedCLICommand extends base_1.CLICommand {
    constructor() {
        super({ name: "seed <cmd> <id>", desc: "seed bank related commands" });
        this.wsRootOptional = true;
    }
    buildArgs(args) {
        super.buildArgs(args);
        (0, utils_1.setupEngineArgs)(args);
        args.positional("cmd", {
            describe: "a command to run",
            choices: Object.values(common_all_1.SeedCommands),
            type: "string",
        });
        args.positional("id", {
            describe: "id of seed",
            type: "string",
        });
        args.option("mode", {
            describe: "what mode to init a seed in",
            type: "string",
            choices: Object.values(engine_server_1.SeedInitMode),
        });
        args.option("registryFile", {
            describe: "yml file used by registry file",
            type: "string",
        });
    }
    async enrichArgs(args) {
        this.addArgsToPayload({ cmd: args.cmd, id: args.id, mode: args.mode });
        const engineOpts = { ...args, init: false };
        if (args.cmd === common_all_1.SeedCommands.INIT &&
            args.mode === engine_server_1.SeedInitMode.CREATE_WORKSPACE) {
            engineOpts.wsRoot = process.cwd();
        }
        const engineArgs = await (0, utils_1.setupEngine)(engineOpts);
        return { data: { ...args, ...engineArgs } };
    }
    async execute(opts) {
        const { cmd, id, wsRoot, config, mode, registryFile } = opts;
        const seedService = new engine_server_1.SeedService({ wsRoot, registryFile });
        const ctx = "execute";
        this.L.info({ ctx, id });
        try {
            switch (cmd) {
                case common_all_1.SeedCommands.ADD: {
                    if (!id) {
                        throw new common_all_1.DendronError({ message: "missing arguments" });
                    }
                    const { error, data } = await seedService.addSeed({ id });
                    if (error) {
                        throw error;
                    }
                    this.print(`success - Planted 1 new seed: ${id}`);
                    return { data };
                }
                case common_all_1.SeedCommands.INIT: {
                    if (!mode) {
                        throw new common_all_1.DendronError({ message: "missing arguments" });
                    }
                    // TODO: gather config
                    const initOpts = lodash_1.default.defaults({}, {
                        name: path_1.default.basename(process.cwd()),
                    });
                    const seed = engine_server_1.SeedUtils.genDefaultConfig({
                        id: opts.id,
                        seed: config,
                        ...initOpts,
                    });
                    const resp = await seedService.init({ wsRoot, mode, seed });
                    this.print(`success - initialized seed: ${id}`);
                    return resp;
                }
                case common_all_1.SeedCommands.INFO: {
                    if (!id) {
                        throw new common_all_1.DendronError({ message: "missing arguments" });
                    }
                    const resp = await seedService.info({ id });
                    if (lodash_1.default.isUndefined(resp)) {
                        this.print(`${id} is not in seed bank`);
                    }
                    else {
                        this.print(JSON.stringify(resp, null, 4));
                    }
                    return { data: resp };
                }
                case common_all_1.SeedCommands.REMOVE: {
                    if (!id) {
                        throw new common_all_1.DendronError({ message: "missing arguments" });
                    }
                    const { error, data } = await seedService.removeSeed({ id });
                    if (error) {
                        throw error;
                    }
                    this.print(`success - remove seed: ${id}`);
                    return { data };
                }
                default:
                    return (0, common_all_1.assertUnreachable)(cmd);
            }
        }
        catch (err) {
            this.L.error(err);
            if (err instanceof common_all_1.DendronError) {
                this.print(["status:", err.status, err.message].join(" "));
            }
            else {
                this.print("unknown error " + (0, common_all_1.error2PlainObject)(err));
            }
            return { error: err };
        }
        finally {
            if (opts.server.close) {
                opts.server.close();
            }
        }
    }
}
exports.SeedCLICommand = SeedCLICommand;
//# sourceMappingURL=seedCLICommand.js.map