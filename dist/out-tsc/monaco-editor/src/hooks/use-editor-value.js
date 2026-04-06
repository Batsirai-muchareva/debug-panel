"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditorValue = useEditorValue;
const element_1 = require("@wordpress/element");
function useEditorValue(editorRef, data) {
    const prevValueRef = (0, element_1.useRef)('');
    (0, element_1.useEffect)(() => {
        var _a;
        const editor = editorRef.current;
        if (!editor) {
            return;
        }
        const next = JSON.stringify(data, null, 2);
        if (next === prevValueRef.current) {
            return;
        }
        prevValueRef.current = next;
        (_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.setValue(next);
    }, [data]);
    return prevValueRef;
}
