"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedElement = getSelectedElement;
function getSelectedElement() {
    const extendedWindow = window;
    return extendedWindow.elementor.selection.getElements()[0];
}
