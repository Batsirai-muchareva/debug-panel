"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantTabsWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const providers_1 = require("@debug-panel/providers");
const tabs_1 = require("@debug-panel/tabs");
const variant_tabs_1 = require("./variant-tabs");
const VariantTabsWrapper = ({ children }) => {
    var _a, _b;
    const { id } = (0, tabs_1.useTabs)();
    return ((0, jsx_runtime_1.jsxs)(tabs_1.TabsProvider, { tabs: (_b = (_a = providers_1.providerRegistry.find(id)) === null || _a === void 0 ? void 0 : _a.variants) !== null && _b !== void 0 ? _b : [], children: [(0, jsx_runtime_1.jsx)(variant_tabs_1.VariantTabs, {}), children] }));
};
exports.VariantTabsWrapper = VariantTabsWrapper;
