"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
const lodash_1 = __importDefault(require("lodash"));
/** Utility for {@link RespV2} */
class ResponseUtil {
    /** true when response has an error; false otherwise. */
    static hasError(resp) {
        return !lodash_1.default.isNull(resp.error);
    }
    static createHappyResponse(input) {
        return {
            error: null,
            data: input.data,
        };
    }
    static createUnhappyResponse(input) {
        return {
            error: input.error,
            data: undefined,
        };
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=responseUtil.js.map