"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportPodCLICommand = void 0;
const pods_core_1 = require("@dendronhq/pods-core");
const base_1 = require("./base");
const pod_1 = require("./pod");
const utils_1 = require("./utils");
const prompts_1 = __importDefault(require("prompts"));
const common_all_1 = require("@dendronhq/common-all");
class ImportPodCLICommand extends base_1.CLICommand {
    constructor() {
        super({
            name: "importPod",
            desc: "use a pod to import notes",
        });
    }
    buildArgs(args) {
        super.buildArgs(args);
        (0, utils_1.setupEngineArgs)(args);
        (0, pod_1.setupPodArgs)(args);
    }
    async enrichArgs(args) {
        this.addArgsToPayload({ podId: args.podId });
        return (0, pod_1.enrichPodArgs)({ pods: (0, pods_core_1.getAllImportPods)(), podType: "import" })(args);
    }
    async execute(opts) {
        const { podClass: PodClass, config, wsRoot, engine, server } = opts;
        const vaults = engine.vaults;
        const pod = new PodClass();
        const utilityMethods = {
            handleConflict: pod_1.handleConflict,
        };
        await pod.execute({
            wsRoot,
            config,
            engine,
            vaults,
            utilityMethods,
            onPrompt: async (type) => {
                const resp = type === pods_core_1.PROMPT.USERPROMPT
                    ? await (0, prompts_1.default)({
                        type: "text",
                        name: "title",
                        message: "Do you want to overwrite: Yes/No",
                        validate: (title) => ["yes", "no"].includes(title.toLowerCase())
                            ? true
                            : `Enter either Yes or No`,
                    })
                    : // eslint-disable-next-line no-console
                        console.log("Note is already in sync with the google doc");
                return resp;
            },
        });
        return new Promise((resolve) => {
            server.close((err) => {
                if (err) {
                    const error = new common_all_1.DendronError({
                        message: "error closing server",
                        payload: err,
                    });
                    return resolve({ error });
                }
                resolve({});
            });
        });
    }
}
exports.ImportPodCLICommand = ImportPodCLICommand;
//# sourceMappingURL=importPod.js.map