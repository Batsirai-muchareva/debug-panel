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
exports.Text = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cx_1 = require("../utils/cx");
const text_module_scss_1 = require("./text.module.scss");
const Text = (_a) => {
    var { as: Tag = 'p', size = 'sm', color = 'primary', truncate, className, children } = _a, props = __rest(_a, ["as", "size", "color", "truncate", "className", "children"]);
    return ((0, jsx_runtime_1.jsx)(Tag, Object.assign({ className: (0, cx_1.cx)(text_module_scss_1.default.text, text_module_scss_1.default[size], text_module_scss_1.default[color], { [text_module_scss_1.default.truncate]: truncate }, className) }, props, { children: children })));
};
exports.Text = Text;
