"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopover = exports.PopoverProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PopoverContext = (0, react_1.createContext)(null);
const PopoverProvider = ({ children }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)(PopoverContext.Provider, { value: { isOpen, setIsOpen }, children: children }));
};
exports.PopoverProvider = PopoverProvider;
const usePopover = () => {
    const context = (0, react_1.useContext)(PopoverContext);
    if (!context) {
        throw new Error('usePopover must be used within a PopoverProvider');
    }
    const { isOpen, setIsOpen } = context;
    return {
        isOpen,
        toggle: () => setIsOpen(!isOpen),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    };
};
exports.usePopover = usePopover;
