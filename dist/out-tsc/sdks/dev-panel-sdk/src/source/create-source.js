"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSource = void 0;
const events_1 = require("@debug-panel/events");
const createSource = (sourceFn) => {
    let notify = null;
    let effects = null;
    // tracks cleanup fns from `on` handlers — inner subscriptions
    const cleanups = new Map();
    // tracks all event unsubscribes from the event bus
    const eventUnsubscribe = [];
    // tracks all interval ids
    const intervalIds = [];
    const context = {
        on(event, handler) {
            const unsub = events_1.eventBus.on(event, () => {
                var _a;
                // cleanup previous inner subscription for this event before re-running
                (_a = cleanups.get(event)) === null || _a === void 0 ? void 0 : _a();
                cleanups.set(event, handler());
            });
            eventUnsubscribe.push(unsub);
        },
        interval(ms, handler) {
            intervalIds.push(setInterval(handler, ms));
        },
    };
    const teardownContext = () => {
        // cleanup all inner subscriptions
        cleanups.forEach((cleanup) => cleanup === null || cleanup === void 0 ? void 0 : cleanup());
        cleanups.clear();
        // unsubscribe all event bus listeners
        eventUnsubscribe.forEach((unsub) => unsub());
        eventUnsubscribe.length = 0;
        // clear all intervals
        intervalIds.forEach((id) => clearInterval(id));
        intervalIds.length = 0;
    };
    return {
        subscribe(notifyFn) {
            var _a;
            if (effects) {
                return;
            }
            notify = notifyFn;
            effects = sourceFn({
                notify: (data) => notify === null || notify === void 0 ? void 0 : notify(data),
                // config,
                context,
            });
            (_a = effects === null || effects === void 0 ? void 0 : effects.setup) === null || _a === void 0 ? void 0 : _a.call(effects);
        },
        unsubscribe() {
            var _a;
            (_a = effects === null || effects === void 0 ? void 0 : effects.teardown) === null || _a === void 0 ? void 0 : _a.call(effects);
            teardownContext();
            effects = null;
            notify = null;
        },
    };
};
exports.createSource = createSource;
