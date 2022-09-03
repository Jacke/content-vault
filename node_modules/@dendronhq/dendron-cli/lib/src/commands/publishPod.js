"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishPodCLICommand = void 0;
const common_all_1 = require("@dendronhq/common-all");
const pods_core_1 = require("@dendronhq/pods-core");
const base_1 = require("./base");
const pod_1 = require("./pod");
const utils_1 = require("./utils");
class PublishPodCLICommand extends base_1.CLICommand {
    constructor() {
        super({
            name: "publishPod",
            desc: "publish a note",
        });
    }
    buildArgs(args) {
        super.buildArgs(args);
        (0, utils_1.setupEngineArgs)(args);
        (0, pod_1.setupPodArgs)(args);
    }
    async enrichArgs(args) {
        this.addArgsToPayload({ podId: args.podId });
        return (0, pod_1.enrichPodArgs)({
            pods: (0, pods_core_1.getAllPublishPods)(),
            podType: "publish",
        })(args);
    }
    async execute(opts) {
        const { podClass: PodClass, config, wsRoot, engine, server } = opts;
        const vaults = engine.vaults;
        const pod = new PodClass();
        const resp = await pod.execute({ wsRoot, config, engine, vaults });
        if (config.dest === "stdout") {
            this.print(resp);
        }
        return new Promise((resolve) => {
            server.close((err) => {
                if (err) {
                    resolve({
                        error: new common_all_1.DendronError({ message: "error closing", payload: err }),
                    });
                }
                resolve({});
            });
        });
    }
}
exports.PublishPodCLICommand = PublishPodCLICommand;
//# sourceMappingURL=publishPod.js.map