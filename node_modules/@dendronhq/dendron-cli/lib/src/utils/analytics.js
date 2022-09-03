"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIAnalyticsUtils = void 0;
const common_all_1 = require("@dendronhq/common-all");
const common_server_1 = require("@dendronhq/common-server");
const cli_1 = require("./cli");
class CLIAnalyticsUtils {
    static track(event, props) {
        const cliVersion = cli_1.CLIUtils.getClientVersion();
        common_server_1.SegmentUtils.track({
            event,
            platformProps: { type: common_all_1.AppNames.CLI, cliVersion },
            properties: props,
        });
    }
    static async trackSync(event, props) {
        const cliVersion = cli_1.CLIUtils.getClientVersion();
        await common_server_1.SegmentUtils.trackSync({
            event,
            platformProps: { type: common_all_1.AppNames.CLI, cliVersion },
            properties: props,
        });
    }
    static identify() {
        const cliVersion = cli_1.CLIUtils.getClientVersion();
        common_server_1.SegmentClient.unlock();
        common_server_1.SegmentUtils.identify({ type: common_all_1.AppNames.CLI, cliVersion });
    }
    /**
     * Show notice about telemetry
     */
    static showTelemetryMessage() {
        if (common_all_1.RuntimeUtils.isRunningInTestOrCI()) {
            return;
        }
        const message = [
            "Dendron collects limited usage data to help improve the quality of our software.",
            "",
            "You can learn everything about our telemetry policies by visiting the following link: ",
            "https://wiki.dendron.so/notes/84df871b-9442-42fd-b4c3-0024e35b5f3c.html",
            "",
            "If you would like to opt out, follow the instructions below: ",
            "https://wiki.dendron.so/notes/84df871b-9442-42fd-b4c3-0024e35b5f3c.html#how-to-opt-out-of-data-collection",
        ].join("\n");
        const header = `\n===================\nTelemetry notice 🌱\n===================\n`;
        const container = `${header}${message}`;
        // eslint-disable-next-line no-console
        console.log(container);
    }
}
exports.CLIAnalyticsUtils = CLIAnalyticsUtils;
//# sourceMappingURL=analytics.js.map