"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFormatUtil = void 0;
class DateFormatUtil {
    /**
     * Formats the date using short letter description for the month
     * (Example 'Dec' for 'December), so that there is no ambiguity on the dates
     * for different locales.
     *
     * Ambiguity to avoid: US is month/day/year while most of the world is day/month/year.
     * */
    static formatDate(millisSinceEpoch) {
        const date = new Date(millisSinceEpoch);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
}
exports.DateFormatUtil = DateFormatUtil;
//# sourceMappingURL=dateFormatUtil.js.map