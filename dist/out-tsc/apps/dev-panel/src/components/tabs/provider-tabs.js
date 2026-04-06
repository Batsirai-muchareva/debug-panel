"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tabs_1 = require("@debug-panel/tabs");
const ProviderTabs = () => {
    const { tabs, id, setId } = (0, tabs_1.useTabs)();
    return ((0, jsx_runtime_1.jsx)(tabs_1.ButtonTab.Group, { onChange: setId, defaultActive: id, children: tabs.map(({ id, title }) => ((0, jsx_runtime_1.jsx)(tabs_1.ButtonTab.Item, { id: id, children: title }, id))) }));
};
exports.ProviderTabs = ProviderTabs;
