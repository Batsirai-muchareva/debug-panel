"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleEditorPointerEvents = toggleEditorPointerEvents;
const ELEMENTOR_PREVIEW_ID = 'elementor-preview';
const POINTER_EVENTS_DISABLED_CLASS = 'pointer-events-none';
function toggleEditorPointerEvents(disableEvents) {
    const elementorPreview = document.getElementById(ELEMENTOR_PREVIEW_ID);
    if (!elementorPreview) {
        return;
    }
    if (disableEvents) {
        elementorPreview.classList.add(POINTER_EVENTS_DISABLED_CLASS);
    }
    else {
        elementorPreview.classList.remove(POINTER_EVENTS_DISABLED_CLASS);
    }
}
