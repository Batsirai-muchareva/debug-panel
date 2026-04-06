"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const indicator_1 = require("../indicator");
const group_module_scss_1 = require("./group.module.scss");
const Group = ({ defaultActive, children, onChange }) => {
    const [active, setActive] = (0, react_1.useState)(defaultActive);
    const trackRef = (0, react_1.useRef)(null);
    const items = react_1.Children.toArray(children).filter(react_1.isValidElement);
    const tabCount = items.length;
    function activate(id) {
        setActive(id);
        onChange === null || onChange === void 0 ? void 0 : onChange(id);
    }
    const activeIndex = items.findIndex((child) => child.props.id === active);
    return ((0, jsx_runtime_1.jsxs)("div", { className: group_module_scss_1.default.group, ref: trackRef, children: [(0, jsx_runtime_1.jsx)(indicator_1.Indicator, { trackRef: trackRef, tabCount: tabCount, activeIndex: activeIndex }), items.map((child) => {
                const item = child;
                return react_1.default.cloneElement(item, {
                    isActive: item.props.id === active,
                    onClick: () => activate(item.props.id),
                });
            })] }));
};
exports.Group = Group;
