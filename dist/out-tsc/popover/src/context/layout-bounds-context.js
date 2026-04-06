"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayoutBounds = exports.LayoutBoundsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const INITIAL_HEIGHT = 550;
const INITIAL_WIDTH = 420;
const Context = (0, react_1.createContext)(undefined);
const LayoutBoundsProvider = ({ children }) => {
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const [size, setSize] = (0, react_1.useState)({
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
    });
    return ((0, jsx_runtime_1.jsx)(Context.Provider, { value: { position, setPosition, size, setSize }, children: children }));
};
exports.LayoutBoundsProvider = LayoutBoundsProvider;
const useLayoutBounds = () => {
    const context = (0, react_1.useContext)(Context);
    if (!context) {
        throw new Error('useBounds must be used within a BoundsProvider');
    }
    return context;
};
exports.useLayoutBounds = useLayoutBounds;
