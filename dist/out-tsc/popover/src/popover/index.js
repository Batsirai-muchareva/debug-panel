"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("@debug-panel/ui");
const layout_bounds_context_1 = require("../context/layout-bounds-context");
const popover_module_scss_1 = require("./popover.module.scss");
const Popover = ({ children }) => {
    const { position, size } = (0, layout_bounds_context_1.useLayoutBounds)();
    const styles = {
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
    };
    return ((0, jsx_runtime_1.jsx)(ui_1.Box, { className: popover_module_scss_1.default.popover, style: styles, children: children }));
};
exports.Popover = Popover;
