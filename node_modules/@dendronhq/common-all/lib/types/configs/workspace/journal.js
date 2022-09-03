"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genDefaultJournalConfig = void 0;
const types_1 = require("./types");
// const assertion to tell the compiler that we only want these as dayOfWeekNumber.
const possibleDayOfWeekNumber = [0, 1, 2, 3, 4, 5, 6];
/**
 * Generates default {@link JournalConfig}
 * @returns JouranlConfig
 */
function genDefaultJournalConfig() {
    return {
        dailyDomain: "daily",
        name: "journal",
        dateFormat: "y.MM.dd",
        addBehavior: types_1.NoteAddBehaviorEnum.childOfDomain,
        // firstDayOfWeek: 1,
    };
}
exports.genDefaultJournalConfig = genDefaultJournalConfig;
//# sourceMappingURL=journal.js.map