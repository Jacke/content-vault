"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackfillV2Command = void 0;
const engine_server_1 = require("@dendronhq/engine-server");
const base_1 = require("./base");
class BackfillV2Command extends base_1.BaseCommand {
    async execute(opts) {
        const backfillService = new engine_server_1.BackfillService();
        return backfillService.updateNotes(opts);
    }
}
exports.BackfillV2Command = BackfillV2Command;
//# sourceMappingURL=backfillV2.js.map