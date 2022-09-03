"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
/**
 * A simple DLogger implementation that just logs to console. This logger works
 * on all platforms.
 */
class ConsoleLogger {
    debug(msg) {
        console.log(`DEBUG: ${msg}`);
    }
    info(msg) {
        console.log(`INFO: ${msg}`);
    }
    error(msg) {
        console.log(`ERROR: ${msg}`);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=DLogger.js.map