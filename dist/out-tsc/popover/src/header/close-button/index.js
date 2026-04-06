"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@debug-panel/icons");
const ui_1 = require("@debug-panel/ui");
const popover_context_1 = require("../../context/popover-context");
const close_btn_module_scss_1 = require("./close-btn.module.scss");
const CloseButton = () => {
    const { close } = (0, popover_context_1.usePopover)();
    return ((0, jsx_runtime_1.jsx)(ui_1.Button, { className: close_btn_module_scss_1.default.closeBtn, onClick: close, children: (0, jsx_runtime_1.jsx)(icons_1.CloseIcon, { size: 12 }) }));
};
exports.CloseButton = CloseButton;
