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
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const cx_1 = require("../utils/cx");
const box_module_scss_1 = require("./box.module.scss");
exports.Box = (0, react_1.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, cx_1.cx)(box_module_scss_1.default.box, className) }, props, { children: children }));
});
