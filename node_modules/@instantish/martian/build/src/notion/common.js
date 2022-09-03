"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.richText = void 0;
function richText(content, options = {}) {
    var _a;
    const annotations = (_a = options.annotations) !== null && _a !== void 0 ? _a : {};
    return {
        type: 'text',
        annotations: {
            bold: false,
            strikethrough: false,
            underline: false,
            italic: false,
            code: false,
            color: 'default',
            ...annotations,
        },
        text: {
            content: content,
            link: options.url
                ? {
                    type: 'url',
                    url: options.url,
                }
                : undefined,
        },
    };
}
exports.richText = richText;
//# sourceMappingURL=common.js.map