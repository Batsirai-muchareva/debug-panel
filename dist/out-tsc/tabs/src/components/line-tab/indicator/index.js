"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("@debug-panel/ui");
const indicator_module_scss_1 = require("./indicator.module.scss");
const Indicator = ({ count, index, className }) => ((0, jsx_runtime_1.jsx)("div", { style: {
        width: `${100 / count}%`,
        transform: `translateX(${index * 100}%)`,
    }, className: (0, ui_1.cx)(indicator_module_scss_1.default.indicator, className) }));
exports.Indicator = Indicator;
