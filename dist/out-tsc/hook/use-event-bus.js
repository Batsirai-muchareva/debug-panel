"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventBus = void 0;
const react_1 = require("react");
const event_bus_1 = require("../event-bus");
const useEventBus = (event, handler) => {
    (0, react_1.useEffect)(() => {
        const events = Array.isArray(event) ? event : [event];
        const offs = events.map(e => event_bus_1.eventBus.on(e, handler));
        return () => {
            offs.forEach(off => off());
        };
    }, [event, handler]);
};
exports.useEventBus = useEventBus;
