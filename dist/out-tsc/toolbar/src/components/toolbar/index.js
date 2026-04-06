"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@debug-panel/icons");
const ui_1 = require("@debug-panel/ui");
const actions_registry_1 = require("../../actions-registry");
const toolbar_context_1 = require("../../context/toolbar-context");
const toolbar_module_scss_1 = require("./toolbar.module.scss");
const Toolbar = () => {
    const actions = (0, actions_registry_1.getActions)();
    const { states, setState } = (0, toolbar_context_1.useToolbar)(actions);
    return ((0, jsx_runtime_1.jsx)(ui_1.Box, { className: toolbar_module_scss_1.default.toolbar, children: actions.map((action) => {
            const state = states[action.id];
            return ((0, jsx_runtime_1.jsxs)(ui_1.Button, { className: (0, ui_1.cx)(toolbar_module_scss_1.default.action, { [toolbar_module_scss_1.default.actionActive]: state }), onClick: () => setState(action, !state), children: [(0, icons_1.getIcon)(action.icon), action.title] }, action.id));
        }) }));
};
exports.Toolbar = Toolbar;
