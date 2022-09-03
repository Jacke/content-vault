"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENT_AB_TESTS = exports.CURRENT_TUTORIAL_TEST = exports.MAIN_TUTORIAL_TYPE_NAME = exports.QuickstartTutorialTestGroups = exports.GRAPH_THEME_TEST = exports.GraphThemeTestGroups = exports.isABTest = void 0;
// ^xi5t1r2j51ot
const abTesting_1 = require("./abTesting");
const isABTest = (value) => {
    return value instanceof abTesting_1.ABTest;
};
exports.isABTest = isABTest;
/**
 * Section: Tests (Active or soon to be active)
 *
 * NOTE: please follow this convention for naming future tests:
 * YYYY-MM-TEST_NAME.  For example, 2022-04-MEETING_NOTE_FEATURE_SHOWCASE.
 *
 * See [[A/B Testing|dendron://dendron.docs/ref.ab-testing]] for more details.
 */
var GraphThemeTestGroups;
(function (GraphThemeTestGroups) {
    /**
     * New user will get Monokai graph theme by default
     */
    GraphThemeTestGroups["monokai"] = "Monokai";
    /**
     * New user will get Classic graph theme by default
     */
    GraphThemeTestGroups["classic"] = "Classic";
    /**
     * New User will get Block theme by default
     */
    GraphThemeTestGroups["block"] = "Block";
})(GraphThemeTestGroups = exports.GraphThemeTestGroups || (exports.GraphThemeTestGroups = {}));
exports.GRAPH_THEME_TEST = new abTesting_1.ABTest("GraphThemeTest", [
    {
        name: GraphThemeTestGroups.monokai,
        weight: 1,
    },
    {
        name: GraphThemeTestGroups.classic,
        weight: 1,
    },
    {
        name: GraphThemeTestGroups.block,
        weight: 1,
    },
]);
var QuickstartTutorialTestGroups;
(function (QuickstartTutorialTestGroups) {
    QuickstartTutorialTestGroups["quickstart-v1"] = "quickstart-v1";
    QuickstartTutorialTestGroups["quickstart-with-lock"] = "quickstart-with-lock";
})(QuickstartTutorialTestGroups = exports.QuickstartTutorialTestGroups || (exports.QuickstartTutorialTestGroups = {}));
/**
 * Experiment to test the impact of a short-form tutorial vs 5-step tutorial on the onboarding funnel.
 *
 * main:          full 5-step tutorial
 * quickstart-v1: one pager tutorial
 */
const _2022_06_QUICKSTART_TUTORIAL_TEST = new abTesting_1.ABTest("2022-06-QuickstartTutorialTest", [
    {
        name: QuickstartTutorialTestGroups["quickstart-v1"],
        weight: 4,
    },
    {
        name: QuickstartTutorialTestGroups["quickstart-with-lock"],
        weight: 1,
    },
]);
/**
 * Tutorial type of our ever-running / up to date main tutorial.
 * This should never change.
 *
 * If after an a/b test we find out that some treatment of the tutorial works better,
 * that treatment should be escalated as the "main", and be synced to the extension as such.
 */
exports.MAIN_TUTORIAL_TYPE_NAME = "main";
/** ^480iitgzeq5w
 * Currently running tutorial AB test group.
 * If we are not running any A/B testing, explicitly set this to `undefined`
 */
exports.CURRENT_TUTORIAL_TEST = _2022_06_QUICKSTART_TUTORIAL_TEST;
/** All A/B tests that are currently running.
 *
 * We apply a filter here before exporting because {@link CURRENT_TUTORIAL_TEST} can be undefined
 * when there is no active tutorial AB test running.
 * ^tkqhy45hflfd
 */
exports.CURRENT_AB_TESTS = [
    exports.GRAPH_THEME_TEST,
    exports.CURRENT_TUTORIAL_TEST,
].filter((entry) => !!entry);
//# sourceMappingURL=abTests.js.map