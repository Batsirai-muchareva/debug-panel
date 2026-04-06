"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = domReady;
function domReady(callback) {
    if (typeof document === 'undefined') {
        return;
    }
    if (document.readyState === 'complete' ||
        document.readyState === 'interactive') {
        return void callback();
    }
    document.addEventListener('DOMContentLoaded', callback);
}
