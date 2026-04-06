"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const popover_1 = require("@debug-panel/popover");
const toggle_bug_button_1 = require("../components/toggle-bug-button");
const panel_visibility_1 = require("./panel/panel-visibility");
function App() {
    return ((0, jsx_runtime_1.jsx)(popover_1.PopoverProvider, { children: (0, jsx_runtime_1.jsxs)(popover_1.LayoutBoundsProvider, { children: [(0, jsx_runtime_1.jsx)(toggle_bug_button_1.ToggleButton, {}), (0, jsx_runtime_1.jsx)(panel_visibility_1.PanelVisibility, {})] }) }));
}
exports.default = App;
