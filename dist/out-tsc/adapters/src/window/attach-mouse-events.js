"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachMouseEvents = void 0;
const events_1 = require("@debug-panel/events");
const attachMouseEvents = () => {
    const onMouseMove = (event) => {
        events_1.eventBus.emit('window:mousemove', {
            clientX: event.clientX,
            clientY: event.clientY,
        });
    };
    const onMouseUp = () => {
        clearEvents();
        events_1.eventBus.emit('window:mouseup');
    };
    const clearEvents = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return clearEvents;
};
exports.attachMouseEvents = attachMouseEvents;
