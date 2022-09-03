"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportPodCLICommand = void 0;
const common_all_1 = require("@dendronhq/common-all");
const pods_core_1 = require("@dendronhq/pods-core");
const base_1 = require("./base");
const pod_1 = require("./pod");
const utils_1 = require("./utils");
class ExportPodCLICommand extends base_1.CLICommand {
    constructor() {
        super({
            name: "exportPod",
            desc: "use a pod to export notes",
        });
    }
    buildArgs(args) {
        super.buildArgs(args);
        (0, utils_1.setupEngineArgs)(args);
        (0, pod_1.setupPodArgs)(args);
    }
    async enrichArgs(args) {
        this.addArgsToPayload({ podId: args.podId });
        return (0, pod_1.enrichPodArgs)({ pods: (0, pods_core_1.getAllExportPods)(), podType: "export" })(args);
    }
    static getPods() {
        return (0, pods_core_1.getAllExportPods)();
    }
    async execute(opts) {
        const ctx = "execute";
        const { podClass: PodClass, config, wsRoot, engine, server, serverSockets, } = opts;
        const vaults = engine.vaults;
        const pod = new PodClass();
        this.L.info({ ctx, msg: "running pod..." });
        await pod.execute({ wsRoot, config, engine, vaults });
        this.L.info({ ctx, msg: "done execute" });
        return new Promise((resolve) => {
            server.close((err) => {
                this.L.info({ ctx, msg: "closing server" });
                // close outstanding connections
                serverSockets === null || serverSockets === void 0 ? void 0 : serverSockets.forEach((socket) => socket.destroy());
                if (err) {
                    return resolve({
                        error: new common_all_1.DendronError({ message: "error closing", payload: err }),
                    });
                }
                resolve({ error: undefined });
            });
        });
    }
}
exports.ExportPodCLICommand = ExportPodCLICommand;
//# sourceMappingURL=exportPod.js.map