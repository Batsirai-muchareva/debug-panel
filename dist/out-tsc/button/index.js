"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cx_1 = require("../utils/cx");
const button_module_scss_1 = require("./button.module.scss");
const Button = (_a) => {
    var { variant = 'primary', size = 'md', className, children, disabled } = _a, props = __rest(_a, ["variant", "size", "className", "children", "disabled"]);
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: (0, cx_1.cx)(button_module_scss_1.default.btn, button_module_scss_1.default[variant], button_module_scss_1.default[size], { [button_module_scss_1.default.disabled]: disabled !== null && disabled !== void 0 ? disabled : false }, className), disabled: disabled }, props, { children: children })));
};
exports.Button = Button;
