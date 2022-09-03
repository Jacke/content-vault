import { ABTest } from "./abTesting";
export declare const isABTest: (value: any) => value is ABTest<any>;
/**
 * Section: Tests (Active or soon to be active)
 *
 * NOTE: please follow this convention for naming future tests:
 * YYYY-MM-TEST_NAME.  For example, 2022-04-MEETING_NOTE_FEATURE_SHOWCASE.
 *
 * See [[A/B Testing|dendron://dendron.docs/ref.ab-testing]] for more details.
 */
export declare enum GraphThemeTestGroups {
    /**
     * New user will get Monokai graph theme by default
     */
    monokai = "Monokai",
    /**
     * New user will get Classic graph theme by default
     */
    classic = "Classic",
    /**
     * New User will get Block theme by default
     */
    block = "Block"
}
export declare const GRAPH_THEME_TEST: ABTest<GraphThemeTestGroups>;
export declare enum QuickstartTutorialTestGroups {
    "quickstart-v1" = "quickstart-v1",
    "quickstart-with-lock" = "quickstart-with-lock"
}
/**
 * Tutorial type of our ever-running / up to date main tutorial.
 * This should never change.
 *
 * If after an a/b test we find out that some treatment of the tutorial works better,
 * that treatment should be escalated as the "main", and be synced to the extension as such.
 */
export declare const MAIN_TUTORIAL_TYPE_NAME = "main";
/** ^480iitgzeq5w
 * Currently running tutorial AB test group.
 * If we are not running any A/B testing, explicitly set this to `undefined`
 */
export declare const CURRENT_TUTORIAL_TEST: ABTest<any> | undefined;
/** All A/B tests that are currently running.
 *
 * We apply a filter here before exporting because {@link CURRENT_TUTORIAL_TEST} can be undefined
 * when there is no active tutorial AB test running.
 * ^tkqhy45hflfd
 */
export declare const CURRENT_AB_TESTS: ABTest<any>[];
