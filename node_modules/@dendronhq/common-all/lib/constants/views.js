"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklinkPanelSortOrder = exports.getWebEditorViewEntry = exports.getWebTreeViewEntry = exports.isWebViewEntry = exports.TREE_VIEWS = exports.EDITOR_VIEWS = exports.DendronTreeViewKey = exports.DendronEditorViewKey = void 0;
const __1 = require("..");
var DendronEditorViewKey;
(function (DendronEditorViewKey) {
    DendronEditorViewKey["CONFIGURE"] = "dendron.configure";
    DendronEditorViewKey["NOTE_GRAPH"] = "dendron.graph-note";
    DendronEditorViewKey["SCHEMA_GRAPH"] = "dendron.graph-schema";
    DendronEditorViewKey["NOTE_PREVIEW"] = "dendron.note-preview";
    DendronEditorViewKey["SEED_BROWSER"] = "dendron.seed-browser";
})(DendronEditorViewKey = exports.DendronEditorViewKey || (exports.DendronEditorViewKey = {}));
var DendronTreeViewKey;
(function (DendronTreeViewKey) {
    DendronTreeViewKey["SAMPLE_VIEW"] = "dendron.sample";
    DendronTreeViewKey["TREE_VIEW"] = "dendron.treeView";
    DendronTreeViewKey["BACKLINKS"] = "dendron.backlinks";
    DendronTreeViewKey["CALENDAR_VIEW"] = "dendron.calendar-view";
    DendronTreeViewKey["LOOKUP_VIEW"] = "dendron.lookup-view";
    DendronTreeViewKey["TIP_OF_THE_DAY"] = "dendron.tip-of-the-day";
    DendronTreeViewKey["HELP_AND_FEEDBACK"] = "dendron.help-and-feedback";
    DendronTreeViewKey["GRAPH_PANEL"] = "dendron.graph-panel";
    DendronTreeViewKey["RECENT_WORKSPACES"] = "dendron.recent-workspaces";
})(DendronTreeViewKey = exports.DendronTreeViewKey || (exports.DendronTreeViewKey = {}));
exports.EDITOR_VIEWS = {
    [DendronEditorViewKey.NOTE_PREVIEW]: {
        desc: "Note Preview",
        label: "Note Preview",
        bundleName: "DendronNotePreview",
        type: "webview",
    },
    [DendronEditorViewKey.CONFIGURE]: {
        desc: "Dendron Configuration",
        label: "Dendron Configuration",
        bundleName: "DendronConfigure",
        type: "webview",
    },
    [DendronEditorViewKey.NOTE_GRAPH]: {
        desc: "Note Graph",
        label: "Note Graph",
        bundleName: "DendronGraphPanel",
        type: "webview",
    },
    [DendronEditorViewKey.SCHEMA_GRAPH]: {
        desc: "Schema Graph",
        label: "Schema Graph",
        bundleName: "DendronSchemaGraphPanel",
        type: "webview",
    },
    [DendronEditorViewKey.SEED_BROWSER]: {
        desc: "Seed Registry",
        label: "Seed Registry",
        bundleName: "SeedBrowser",
        type: "webview",
    },
};
/**
 * Value is the name of webpack bundle for webview based tree views
 */
exports.TREE_VIEWS = {
    [DendronTreeViewKey.SAMPLE_VIEW]: {
        desc: "A view used for prototyping",
        label: "Sample View",
        bundleName: "SampleComponent",
        type: "webview",
    },
    [DendronTreeViewKey.TREE_VIEW]: {
        desc: "Tree View",
        label: "Tree View",
        type: "nativeview",
    },
    [DendronTreeViewKey.BACKLINKS]: {
        desc: "Shows all backlinks to the currentnote",
        label: "Backlinks",
        type: "nativeview",
    },
    [DendronTreeViewKey.CALENDAR_VIEW]: {
        desc: "Calendar View",
        label: "Calendar View",
        type: "webview",
        bundleName: "DendronCalendarPanel",
    },
    [DendronTreeViewKey.LOOKUP_VIEW]: {
        desc: "Lookup View",
        label: "Lookup View",
        type: "webview",
        bundleName: "DendronLookupPanel",
    },
    [DendronTreeViewKey.TIP_OF_THE_DAY]: {
        desc: "Feature Showcase",
        label: "Feature Showcase",
        type: "webview",
        bundleName: "DendronTipOfTheDay",
    },
    [DendronTreeViewKey.RECENT_WORKSPACES]: {
        desc: "Recent Dendron Workspaces",
        label: "Recent Dendron Workspaces",
        type: "nativeview",
    },
    [DendronTreeViewKey.HELP_AND_FEEDBACK]: {
        desc: "Help and Feedback",
        label: "Help and Feedback",
        type: "nativeview",
    },
    [DendronTreeViewKey.GRAPH_PANEL]: {
        desc: "Graph Panel (side)",
        label: "Graph Panel",
        bundleName: "DendronSideGraphPanel",
        type: "webview",
    },
};
const isWebViewEntry = (entry) => {
    return entry.type === "webview";
};
exports.isWebViewEntry = isWebViewEntry;
const getWebTreeViewEntry = (key) => {
    const out = exports.TREE_VIEWS[key];
    if ((0, exports.isWebViewEntry)(out)) {
        return out;
    }
    throw __1.ErrorFactory.createInvalidStateError({
        message: `${key} is not valid webview key`,
    });
};
exports.getWebTreeViewEntry = getWebTreeViewEntry;
const getWebEditorViewEntry = (key) => {
    const out = exports.EDITOR_VIEWS[key];
    if ((0, exports.isWebViewEntry)(out)) {
        return out;
    }
    throw __1.ErrorFactory.createInvalidStateError({
        message: `${key} is not valid webview key`,
    });
};
exports.getWebEditorViewEntry = getWebEditorViewEntry;
var BacklinkPanelSortOrder;
(function (BacklinkPanelSortOrder) {
    /** Using path sorted so order with shallow first = true */
    BacklinkPanelSortOrder["PathNames"] = "PathNames";
    BacklinkPanelSortOrder["LastUpdated"] = "LastUpdated";
})(BacklinkPanelSortOrder = exports.BacklinkPanelSortOrder || (exports.BacklinkPanelSortOrder = {}));
//# sourceMappingURL=views.js.map