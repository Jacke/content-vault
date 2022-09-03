"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConflict = exports.PodSource = exports.executePod = exports.enrichPodArgs = exports.setupPodArgs = exports.fetchPodClassV4 = void 0;
/* eslint-disable import/no-dynamic-require */
const common_all_1 = require("@dendronhq/common-all");
const pods_core_1 = require("@dendronhq/pods-core");
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const utils_1 = require("./utils");
function fetchPodClassV4(podId, opts) {
    const { podSource, pods } = opts;
    if (podSource === PodSource.BUILTIN) {
        if (!pods) {
            throw Error("pods needs to be defined");
        }
        const podClass = lodash_1.default.find(pods, {
            id: podId,
        });
        if (lodash_1.default.isUndefined(podClass)) {
            throw Error("no pod found");
        }
        return podClass;
    }
    else {
        if (!opts.podPkg || !opts.wsRoot) {
            throw Error("podPkg not defined");
        }
        // eslint-disable-next-line global-require
        const podEntries = require(`${path_1.default.join(opts.wsRoot, "node_modules", opts.podPkg)}`).pods;
        const podClass = lodash_1.default.find(podEntries, (entry) => {
            return entry.id === podId && entry.kind === opts.podType;
        });
        if (!podClass) {
            throw Error("no podClass found");
        }
        return podClass;
    }
}
exports.fetchPodClassV4 = fetchPodClassV4;
function setupPodArgs(args) {
    args.option("podId", {
        describe: "id of pod to use",
        requiresArg: true,
    });
    args.option("showConfig", {
        describe: "show pod configuration",
    });
    args.option("genConfig", {
        describe: "show pod configuration",
    });
    args.option("podPkg", {
        describe: "if specifying a custom pod, name of pkg",
    });
    args.option("config", {
        describe: "pass in config instead of reading from file. format is comma delimited {key}={value} pairs",
    });
    args.option("podSource", {
        describe: "podSource",
        choices: lodash_1.default.values(PodSource),
        default: PodSource.BUILTIN,
    });
}
exports.setupPodArgs = setupPodArgs;
function enrichPodArgs(opts) {
    const { pods, podType } = opts;
    const enrichFunc = async (args) => {
        const { podId, showConfig, podSource, podPkg, genConfig, config } = args;
        const engineArgs = await (0, utils_1.setupEngine)(args);
        // normalized wsRoot
        const wsRoot = engineArgs.wsRoot;
        const podClass = fetchPodClassV4(podId, {
            pods,
            podType,
            podSource,
            podPkg,
            wsRoot,
        });
        // if show config, output configuration and exit
        if (showConfig) {
            // eslint-disable-next-line new-cap
            const config = new podClass().config;
            // eslint-disable-next-line no-console
            console.log(config);
            process.exit(0);
        }
        // if genConfig, create the file and exit
        if (genConfig) {
            const podsDir = pods_core_1.PodUtils.getPodDir({ wsRoot });
            const configPath = pods_core_1.PodUtils.genConfigFile({
                podsDir,
                podClass,
                force: true,
            });
            // eslint-disable-next-line no-console
            console.log(`config generated at ${configPath}`);
            process.exit(0);
        }
        // read the config file
        const podsDir = path_1.default.join(wsRoot, "pods");
        let cleanConfig = {};
        const resp = args.configPath
            ? pods_core_1.PodUtils.readPodConfigFromDisk(args.configPath)
            : pods_core_1.PodUtils.getConfig({
                podsDir,
                podClass,
            });
        if (resp.error && !config && pods_core_1.PodUtils.hasRequiredOpts(podClass)) {
            return {
                error: resp.error,
            };
        }
        if (resp.data) {
            cleanConfig = resp.data;
        }
        // if additional parameters are passed in, then add them to the config
        // add additional config
        if (config) {
            config.split(",").map((ent) => {
                const [k, v] = ent.split("=");
                cleanConfig[k] = v;
            });
        }
        if (podType === "publish") {
            switch (podId) {
                case pods_core_1.MarkdownPublishPod.id:
                case pods_core_1.JSONPublishPod.id:
                case pods_core_1.HTMLPublishPod.id:
                    cleanConfig["dest"] = "stdout";
                    break;
                default:
                    // default is no-op
                    break;
            }
            // if vault is specified, then override config to pass in
            if (args.vault) {
                cleanConfig["vaultName"] = args.vault;
            }
            if (args.query) {
                cleanConfig["fname"] = args.query;
            }
        }
        else if (podId !== pods_core_1.NextjsExportPod.id) {
            // eslint-disable-next-line no-console
            console.log(`WARN: --query and --vault parameter not implemented for podType ${podType}`);
        }
        // error checking, config shouldn't be empty
        if (lodash_1.default.isEmpty(cleanConfig)) {
            const podConfigPath = pods_core_1.PodUtils.getConfigPath({ podsDir, podClass });
            throw new common_all_1.DendronError({
                status: "no-config",
                message: `no config found. please create a config at ${podConfigPath}`,
            });
        }
        return {
            data: {
                ...args,
                ...engineArgs,
                podClass,
                config: cleanConfig,
            },
        };
    };
    return enrichFunc;
}
exports.enrichPodArgs = enrichPodArgs;
const executePod = async (opts) => {
    const { podClass: PodClass, config, wsRoot, engine, server } = opts;
    const vaults = engine.vaults;
    const pod = new PodClass();
    await pod.execute({ wsRoot, config, engine, vaults });
    server.close((err) => {
        if (err) {
            throw err;
        }
    });
};
exports.executePod = executePod;
var PodSource;
(function (PodSource) {
    PodSource["CUSTOM"] = "custom";
    PodSource["BUILTIN"] = "builtin";
})(PodSource = exports.PodSource || (exports.PodSource = {}));
const handleConflict = async (conflict, conflictResolveOpts) => {
    const options = conflictResolveOpts.options();
    let optionsMessage = "What would you like to do? Choose 0/1..";
    options.map((option, index) => {
        optionsMessage = optionsMessage.concat(`\n${index}: ${option}`);
    });
    const resp = await (0, prompts_1.default)({
        type: "text",
        name: "choice",
        message: `${conflictResolveOpts.message(conflict)}\n${optionsMessage}`,
        validate: (choice) => conflictResolveOpts.validate(choice, options),
    });
    return options[resp.choice];
};
exports.handleConflict = handleConflict;
//# sourceMappingURL=pod.js.map