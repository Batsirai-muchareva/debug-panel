"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelVisibility = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const popover_1 = require("@debug-panel/popover");
const index_1 = require("./index");
const PanelVisibility = () => {
    const { isOpen: isPopoverOpen } = (0, popover_1.usePopover)();
    if (!isPopoverOpen) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(index_1.Panel, {}));
};
exports.PanelVisibility = PanelVisibility;
