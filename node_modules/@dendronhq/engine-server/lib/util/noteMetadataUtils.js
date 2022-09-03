"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteMetadataUtils = void 0;
const common_all_1 = require("@dendronhq/common-all");
const lodash_1 = __importDefault(require("lodash"));
const luxon_1 = require("luxon");
const unified_1 = require("@dendronhq/unified");
var NullOrUndefined;
(function (NullOrUndefined) {
    NullOrUndefined[NullOrUndefined["UNDEFINED"] = 0] = "UNDEFINED";
    NullOrUndefined[NullOrUndefined["NULL"] = 1] = "NULL";
    NullOrUndefined[NullOrUndefined["NO_UNDEFINED_OR_NULL"] = 2] = "NO_UNDEFINED_OR_NULL";
})(NullOrUndefined || (NullOrUndefined = {}));
class NoteMetadataUtils {
    /**
     * Return list of strings from links
     * @param links
     */
    static cleanTags(links) {
        return links.map((l) => {
            return l.value.replace(/^tags./, "");
        });
    }
    static checkIfAllowNullOrUndefined(val, { required, strictNullChecks }) {
        if (lodash_1.default.isUndefined(val) && !required) {
            return NullOrUndefined.UNDEFINED;
        }
        if (lodash_1.default.isNull(val) && !strictNullChecks) {
            return NullOrUndefined.NULL;
        }
        return NullOrUndefined.NO_UNDEFINED_OR_NULL;
    }
    static checkAndReturnUndefinedOrError(val, props) {
        if (NoteMetadataUtils.checkIfAllowNullOrUndefined(val, props) !==
            NullOrUndefined.NO_UNDEFINED_OR_NULL) {
            return { data: undefined };
        }
        return {
            error: common_all_1.ErrorFactory.createInvalidStateError({
                message: `${val} is wrong type`,
            }),
        };
    }
    static checkIfSkipOnEmpty(key, val, props) {
        const { skipOnEmpty = true } = props;
        if (lodash_1.default.isEmpty(val) && skipOnEmpty) {
            return { data: undefined };
        }
        if (lodash_1.default.isEmpty(val) && !skipOnEmpty) {
            return {
                error: common_all_1.ErrorFactory.createInvalidStateError({
                    message: `The value for ${key} is found empty. Please provide a valid value or enable skipOnEmpty in the srcFieldMapping.`,
                }),
            };
        }
        return { data: val };
    }
    /**
     * Extract string metadata from note
     * @returns
     */
    static extractString({ note, key, ...props }) {
        const val = lodash_1.default.get(note, key);
        if (lodash_1.default.isString(val)) {
            return { data: val };
        }
        return NoteMetadataUtils.checkAndReturnUndefinedOrError(val, props);
    }
    static extractNumber({ note, key, ...props }) {
        const val = lodash_1.default.get(note, key);
        if (lodash_1.default.isNumber(val)) {
            return { data: val };
        }
        if ((0, common_all_1.isNumeric)(val)) {
            return { data: parseFloat(val) };
        }
        return NoteMetadataUtils.checkAndReturnUndefinedOrError(val, props);
    }
    static extractBoolean({ note, key, ...props }) {
        const val = lodash_1.default.get(note, key);
        if (lodash_1.default.isBoolean(val)) {
            return { data: val };
        }
        return NoteMetadataUtils.checkAndReturnUndefinedOrError(val, props);
    }
    static extractDate({ note, key, ...props }) {
        // TODO: we should validate
        const val = lodash_1.default.get(note, key);
        if (lodash_1.default.isNumber(val)) {
            return {
                data: luxon_1.DateTime.fromMillis(val).toLocaleString(luxon_1.DateTime.DATETIME_FULL),
            };
        }
        return NoteMetadataUtils.checkIfSkipOnEmpty(key, val, props);
    }
    /**
     * If field is not found, return empty array
     */
    static extractArray({ note, key, }) {
        return lodash_1.default.get(note, key, []);
    }
    /**
     * Get all links from a note
     */
    static extractLinks({ note, filters }) {
        let links = note.links;
        filters.map((pattern) => {
            links = links.filter((t) => (0, common_all_1.minimatch)(t.value, pattern));
        });
        return links;
    }
    /**
     * Get hashtags from note
     */
    static extractTags({ note, filters }) {
        let links = unified_1.LinkUtils.findHashTags({ links: note.links });
        filters.map((pattern) => {
            links = links.filter((t) => (0, common_all_1.minimatch)(t.value, pattern));
        });
        return links;
    }
    static extractSingleTag({ note, filters, }) {
        const tags = this.extractTags({ note, filters });
        if (tags.length > 1) {
            const error = new common_all_1.DendronError({
                message: `singleTag field has multiple values. note: ${note.fname}, tags: ${tags.map((ent) => ent.alias).join(", ")}`,
            });
            return { error };
        }
        if (tags.length === 0) {
            return { data: undefined };
        }
        return { data: tags[0] };
    }
}
exports.NoteMetadataUtils = NoteMetadataUtils;
//# sourceMappingURL=noteMetadataUtils.js.map