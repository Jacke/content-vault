/**
 * True if path is excluded by either the path or glob criteria.
 * path may be to a directory or individual file.
 */
export declare const shouldExcludePath: (path: string, pathsToIgnore: Set<string>, globsToIgnore: string[]) => boolean;
