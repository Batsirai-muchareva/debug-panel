"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tabs_1 = require("@debug-panel/tabs");
const VariantTabs = () => {
    const { tabs, id, setId: setVariantTab } = (0, tabs_1.useTabs)();
    return ((0, jsx_runtime_1.jsx)(tabs_1.LineTab.Group, { onChange: setVariantTab, defaultActive: id, children: tabs.map(({ id, label }) => ((0, jsx_runtime_1.jsx)(tabs_1.LineTab.Item, { id: id, children: label }, id))) }));
};
exports.VariantTabs = VariantTabs;
