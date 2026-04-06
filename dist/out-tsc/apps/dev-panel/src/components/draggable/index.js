"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("@debug-panel/ui");
const draggable_module_scss_1 = require("./draggable.module.scss");
const use_draggable_1 = require("../../hooks/use-draggable");
const Draggable = ({ children }) => {
    const { startDrag } = (0, use_draggable_1.useDraggable)();
    return (0, jsx_runtime_1.jsx)(ui_1.Box, { onMouseDown: startDrag, className: draggable_module_scss_1.default.draggable, children: children });
};
exports.Draggable = Draggable;
