"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const box_1 = require("../box");
const divider_module_scss_1 = require("./divider.module.scss");
const Divider = () => {
    return (0, jsx_runtime_1.jsx)(box_1.Box, { className: divider_module_scss_1.default.divider });
};
exports.Divider = Divider;
