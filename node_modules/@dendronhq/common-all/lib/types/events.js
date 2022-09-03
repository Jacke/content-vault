"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const events_1 = require("events");
/**
 * An event emitter can be used to create and manage an {@link Event} for others
 * to subscribe to. One emitter always owns one event.
 *
 * This mimics the interface signature of vscode.EventEmitter but can be used
 * outside of plugin-core.
 */
class EventEmitter {
    constructor() {
        this._emitter = new events_1.EventEmitter();
        this._EVENT_CHANNEL = "default";
        /**
         * The event listeners can subscribe to.
         */
        this.event = (listener, thisArgs) => {
            let callback = listener;
            if (thisArgs) {
                callback = callback.bind(thisArgs);
            }
            this._emitter.on(this._EVENT_CHANNEL, callback);
            const disposable = {
                dispose: () => {
                    this._emitter.removeListener(this._EVENT_CHANNEL, callback);
                },
            };
            return disposable;
        };
    }
    /**
     * Notify all subscribers of the {@link EventEmitter.event event}. Failure
     * of one or more listener will not fail this function call.
     *
     * @param data The event object.
     */
    fire(data) {
        this._emitter.emit(this._EVENT_CHANNEL, data);
    }
    /**
     * Dispose this object and free resources.
     */
    dispose() {
        this._emitter.removeAllListeners(this._EVENT_CHANNEL);
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=events.js.map