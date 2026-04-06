"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyInitialFold = applyInitialFold;
function applyInitialFold(editor) {
    requestAnimationFrame(() => {
        var _a, _b;
        (_a = editor.getAction('editor.foldAll')) === null || _a === void 0 ? void 0 : _a.run();
        (_b = editor.getAction('editor.unfold')) === null || _b === void 0 ? void 0 : _b.run();
    });
}
