"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupInitialValue = setupInitialValue;
/**
 * @param editor
 * @param data
 *
 * Data is intentionally captured once — initial value only.
 * subsequent updates are handled imperatively by useEditorValue.
 */
function setupInitialValue(editor, data) {
    var _a;
    const initial = JSON.stringify(data, null, 2);
    console.log(initial);
    (_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.setValue('initial');
}
