"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useData = exports.DataProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_provider_1 = require("../hooks/use-provider");
const DataContext = (0, react_1.createContext)(undefined);
const DataProvider = ({ children }) => {
    const rawData = (0, use_provider_1.useProvider)();
    return ((0, jsx_runtime_1.jsx)(DataContext.Provider, { value: { data: rawData }, children: children }));
};
exports.DataProvider = DataProvider;
const useData = () => {
    const context = (0, react_1.useContext)(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
exports.useData = useData;
