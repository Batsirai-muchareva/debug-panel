"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const monaco_editor_1 = require("@debug-panel/monaco-editor");
const tabs_1 = require("@debug-panel/tabs");
const toolbar_1 = require("@debug-panel/toolbar");
const data_context_1 = require("../../context/data-context");
const Content = () => {
    const { data } = (0, data_context_1.useData)();
    const { id: variantId } = (0, tabs_1.useTabs)();
    return ((0, jsx_runtime_1.jsxs)(toolbar_1.ToolbarProvider, { variantId: variantId, children: [(0, jsx_runtime_1.jsx)(toolbar_1.Toolbar, {}), (0, jsx_runtime_1.jsx)(monaco_editor_1.MonacoEditor, { data: data })] }));
};
exports.Content = Content;
