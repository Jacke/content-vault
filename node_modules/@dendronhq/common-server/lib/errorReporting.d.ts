import { Stage } from "@dendronhq/common-all";
import * as Sentry from "@sentry/node";
export declare function rewriteFilename(filename: string): string;
export declare function isBadErrorThatShouldBeSampled(error: string | Error | {
    message: string;
} | null | undefined): boolean | "" | null | undefined;
/**
 * Initialize Sentry
 * @param environment
 * @returns
 *  ^4wcl13fw6gub
 */
export declare function initializeSentry({ environment, sessionId, release, }: {
    environment: Stage;
    sessionId?: number;
    release: string;
}): void;
export declare function eventModifier(event: Sentry.Event, hint: Sentry.EventHint | undefined): Sentry.Event | PromiseLike<Sentry.Event | null> | null;
