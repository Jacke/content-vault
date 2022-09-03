"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizeCLICommand = void 0;
const dendron_viz_1 = require("@dendronhq/dendron-viz");
const base_1 = require("./base");
const utils_1 = require("./utils");
class VisualizeCLICommand extends base_1.CLICommand {
    constructor() {
        super({
            name: "visualize",
            desc: "generates a packed circles visualization of Dendron workspace",
        });
    }
    buildArgs(args) {
        super.buildArgs(args);
        (0, utils_1.setupEngineArgs)(args);
        args.option("out", { description: "path to the output file " });
    }
    async enrichArgs(args) {
        /* Instantiate an engine and pass it to the execute method as part of the argument */
        const engineArgs = await (0, utils_1.setupEngine)(args);
        return { data: { ...args, ...engineArgs } };
    }
    async execute(opts) {
        await (0, dendron_viz_1.generateSVG)(opts);
        return { exit: true };
    }
}
exports.VisualizeCLICommand = VisualizeCLICommand;
//# sourceMappingURL=visualizeCLICommand.js.map