"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserBase = void 0;
class ParserBase {
    constructor(opts) {
        this.opts = opts;
    }
    get logger() {
        return this.opts.logger;
    }
}
exports.ParserBase = ParserBase;
//# sourceMappingURL=parseBase.js.map