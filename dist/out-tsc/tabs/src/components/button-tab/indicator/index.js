"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ui_1 = require("@debug-panel/ui");
const indicator_module_scss_1 = require("./indicator.module.scss");
const Indicator = ({ tabCount, padding = 3, activeIndex, trackRef }) => {
    const [width, setWidth] = (0, react_1.useState)(0);
    const calculateSize = (0, react_1.useCallback)(() => {
        const el = trackRef.current;
        if (!el || tabCount === 0) {
            return;
        }
        setWidth((el.clientWidth - padding * 2) / tabCount);
    }, [trackRef, tabCount, padding]);
    (0, react_1.useEffect)(() => {
        requestAnimationFrame(calculateSize);
    }, [calculateSize]);
    (0, react_1.useEffect)(() => {
        const el = trackRef.current;
        if (!el) {
            return;
        }
        const observer = new ResizeObserver(calculateSize);
        observer.observe(el);
        return () => observer.disconnect();
    }, [calculateSize]);
    const style = {
        width,
        transform: `translateX(${activeIndex * width + padding}px)`, /** padding offset so indicator aligns inside the track padding **/
        opacity: width === 0 ? 0 : 1, /** hide the flash on first render before width is measured **/
    };
    return (0, jsx_runtime_1.jsx)(ui_1.Box, { style: style, className: indicator_module_scss_1.default.indicator });
};
exports.Indicator = Indicator;
