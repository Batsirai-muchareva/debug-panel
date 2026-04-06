"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = void 0;
const createEventBus = (options = {}) => {
    const { historySize = 100, debug = false } = options;
    const listeners = new Map();
    const history = [];
    const getListeners = (event) => {
        if (!listeners.has(event)) {
            listeners.set(event, new Set());
        }
        return listeners.get(event);
    };
    return {
        on: (event, handler) => {
            const eventListeners = getListeners(event);
            eventListeners.add(handler);
            return () => {
                eventListeners.delete(handler);
            };
        },
        once(event, handler) {
            const wrappedHandler = (payload) => {
                // Remove before calling to prevent re-entry issues
                getListeners(event).delete(wrappedHandler);
                handler(payload);
            };
            getListeners(event).add(wrappedHandler);
        },
        emit(event, ...args) {
            const payload = args[0];
            history.push({
                event,
                payload,
                timestamp: Date.now(),
            });
            // Trim history if too large
            while (history.length > historySize) {
                history.shift();
            }
            // Notify listeners
            const eventListeners = getListeners(event);
            eventListeners.forEach((handler) => {
                try {
                    handler(payload);
                }
                catch (error) {
                    console.error(`[EventBus] Error in handler for "${event}":`, error);
                }
            });
        },
        off(event) {
            listeners.delete(event);
        },
        offAll() {
            listeners.clear();
        },
    };
};
exports.eventBus = createEventBus();
