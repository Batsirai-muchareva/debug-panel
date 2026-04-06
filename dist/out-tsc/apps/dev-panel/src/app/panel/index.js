"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const popover_1 = require("@debug-panel/popover");
const tabs_1 = require("@debug-panel/tabs");
const ui_1 = require("@debug-panel/ui");
const draggable_1 = require("../../components/draggable");
const empty_state_1 = require("../../components/empty-state");
const provider_tabs_1 = require("../../components/tabs/provider-tabs");
const variant_tabs_wrapper_1 = require("../../components/tabs/variant/variant-tabs-wrapper");
const data_context_1 = require("../../context/data-context");
const use_has_data_1 = require("../../hooks/use-has-data");
const use_providers_configs_1 = require("../../hooks/use-providers-configs");
const content_1 = require("./content");
const Panel = () => {
    const providers = (0, use_providers_configs_1.useProvidersConfigs)();
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverHeader, { enhance: draggable_1.Draggable, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "Debug Panel" }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsProvider, { tabs: providers, children: [(0, jsx_runtime_1.jsx)(provider_tabs_1.ProviderTabs, {}), (0, jsx_runtime_1.jsx)(variant_tabs_wrapper_1.VariantTabsWrapper, { children: (0, jsx_runtime_1.jsx)(data_context_1.DataProvider, { children: (0, jsx_runtime_1.jsx)(TabContent, {}) }) })] }) })] }));
};
exports.Panel = Panel;
const TabContent = () => {
    const hasData = (0, use_has_data_1.useHasData)();
    if (!hasData) {
        return (0, jsx_runtime_1.jsx)(empty_state_1.EmptyState, {});
    }
    return (0, jsx_runtime_1.jsx)(content_1.Content, {});
};
