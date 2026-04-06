"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ui_1 = require("@debug-panel/ui");
const close_button_1 = require("./close-button");
const header_module_scss_1 = require("./header.module.scss");
const Header = ({ children, enhance: Enhance = react_1.Fragment }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Enhance, { children: (0, jsx_runtime_1.jsxs)(ui_1.Box, { className: header_module_scss_1.default.header, children: [children, (0, jsx_runtime_1.jsx)(close_button_1.CloseButton, {})] }) }), (0, jsx_runtime_1.jsx)(ui_1.Divider, {})] }));
};
exports.Header = Header;
