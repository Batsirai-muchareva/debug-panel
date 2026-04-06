"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlotId = void 0;
// this should not be here dynamically injected or part of adapter
const getSlotId = () => {
    var _a;
    const extendedWindow = window;
    const id = (_a = extendedWindow.debugPanelConfig) === null || _a === void 0 ? void 0 : _a.slot_id;
    if (!id) {
        console.error('Element id is required for rendering the Debug Panel');
        return '';
    }
    return id;
};
exports.getSlotId = getSlotId;
