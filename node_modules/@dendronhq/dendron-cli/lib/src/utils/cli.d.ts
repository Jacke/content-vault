import ora from "ora";
export declare class CLIUtils {
    /**
     * Takes an object like
     *     {
     *     		foo: "42",
     *     		bar: 10
     *     }
     * and returns "foo=42,bar=10"
     * @param ent: config object
     * @returns
     */
    static objectConfig2StringConfig: (ent: any) => string;
    static getClientVersion(): any;
}
export declare class SpinnerUtils {
    /**
     * Given a Ora spinner, render given text with optional symbol
     * Continue spinning.
     * @param opts
     */
    static renderAndContinue(opts: {
        spinner: ora.Ora;
        text?: string;
        symbol?: string;
    }): void;
}
