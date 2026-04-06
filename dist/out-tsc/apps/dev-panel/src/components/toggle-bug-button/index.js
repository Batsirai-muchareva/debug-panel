"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@debug-panel/icons");
const popover_1 = require("@debug-panel/popover");
const ui_1 = require("@debug-panel/ui");
const logo2_png_1 = require("../../assets/logo2.png");
const toggle_module_scss_1 = require("./toggle.module.scss");
const ToggleButton = () => {
    const { close, open, isOpen } = (0, popover_1.usePopover)();
    if (isOpen) {
        return ((0, jsx_runtime_1.jsx)(ui_1.Button, { onClick: close, className: (0, ui_1.cx)(toggle_module_scss_1.default.toggle, toggle_module_scss_1.default.toggleOpen), children: (0, jsx_runtime_1.jsx)(icons_1.CloseIcon, {}) }));
    }
    return ((0, jsx_runtime_1.jsx)(ui_1.Button, { onClick: open, className: (0, ui_1.cx)(toggle_module_scss_1.default.toggle, toggle_module_scss_1.default.toggleClosed), children: (0, jsx_runtime_1.jsx)("img", { src: logo2_png_1.default, alt: "Debug Panel", className: toggle_module_scss_1.default.logo }) }));
};
exports.ToggleButton = ToggleButton;
