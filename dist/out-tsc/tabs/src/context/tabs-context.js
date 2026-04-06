"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTabs = exports.TabsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TabsContext = (0, react_1.createContext)(null);
const TabsProvider = ({ tabs, children }) => {
    const [id, setId] = (0, react_1.useState)(tabs[0].id);
    return ((0, jsx_runtime_1.jsx)(TabsContext.Provider, { value: { id, setId, tabs }, children: children }));
};
exports.TabsProvider = TabsProvider;
const useTabs = () => {
    const context = (0, react_1.useContext)(TabsContext);
    if (!context) {
        throw new Error('useTabs must be used within a TabsProvider');
    }
    return context;
};
exports.useTabs = useTabs;
