"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostId = getPostId;
function getPostId() {
    const extendedWindow = window;
    return extendedWindow.elementor.config.document.id;
}
