"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("@debug-panel/ui");
const content_module_scss_1 = require("./content.module.scss");
const Content = ({ children }) => {
    return ((0, jsx_runtime_1.jsx)(ui_1.Box, { className: content_module_scss_1.default.wrapper, children: (0, jsx_runtime_1.jsx)(ui_1.Box, { className: content_module_scss_1.default.content, children: children }) }));
};
exports.Content = Content;
