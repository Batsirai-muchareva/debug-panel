"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDraggable = useDraggable;
const react_1 = require("react");
const adapters_1 = require("@debug-panel/adapters");
const events_1 = require("@debug-panel/events");
const popover_1 = require("@debug-panel/popover");
function useDraggable() {
    const { position, setPosition } = (0, popover_1.useLayoutBounds)();
    const dragStateRef = (0, react_1.useRef)({
        isDragging: false,
        startPos: { x: 0, y: 0 },
        startPosition: { x: 0, y: 0 }
    });
    const startDrag = (e) => {
        e.preventDefault();
        adapters_1.windowAdapter.attachMouseEvents();
        dragStateRef.current = {
            isDragging: true,
            startPos: { x: e.clientX, y: e.clientY },
            startPosition: { x: position.x, y: position.y }
        };
        events_1.eventBus.emit('popover:before:dragging');
    };
    const stopDrag = () => {
        dragStateRef.current.isDragging = false;
        events_1.eventBus.emit('popover:after:dragging');
    };
    const handleDrag = (e) => {
        const state = dragStateRef.current;
        if (!state.isDragging) {
            return;
        }
        const deltaX = e.clientX - state.startPos.x;
        const deltaY = e.clientY - state.startPos.y;
        setPosition({
            x: state.startPosition.x + deltaX,
            y: state.startPosition.y + deltaY
        });
        events_1.eventBus.emit('popover:dragging');
    };
    (0, events_1.useEventBus)('window:mousemove', handleDrag);
    (0, events_1.useEventBus)('window:mouseup', stopDrag);
    return {
        startDrag
    };
}
