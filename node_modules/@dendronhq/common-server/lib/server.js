"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressUtils = void 0;
const common_all_1 = require("@dendronhq/common-all");
class ExpressUtils {
    /**
     * Utility to handle errors from Express
     * @param expressResponse : Response object form express
     * @param dendronResponse : Response from Dendron
     * @returns True if error was handled, false if no error
     */
    static handleError(expressResponse, dendronResponse) {
        if (dendronResponse.error) {
            expressResponse
                .status(dendronResponse.error.code || common_all_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: (0, common_all_1.error2PlainObject)(dendronResponse.error) });
            return true;
        }
        return false;
    }
    /**
     * Set a standard response format to express rest clients based on RespV2
     * @param expressResponse
     * @param dendronResponse
     */
    static setResponse(expressResponse, dendronResponse) {
        if (dendronResponse.error) {
            // TODO: Don't set a status code of 500 by default.  The default for
            // expected error (as is the case for all handled errors here) should be
            // 400 BAD_REQUEST. All 500 Internal Errors are handled by default express
            // error handler (see appModule in Server.ts)
            expressResponse
                .status(dendronResponse.error.code || common_all_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ error: (0, common_all_1.error2PlainObject)(dendronResponse.error) });
        }
        else {
            expressResponse.json(dendronResponse);
        }
    }
}
exports.ExpressUtils = ExpressUtils;
//# sourceMappingURL=server.js.map