"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("@debug-panel/ui");
const item_module_scss_1 = require("./item.module.scss");
const Item = ({ children, isActive, onClick }) => ((0, jsx_runtime_1.jsx)(ui_1.Button, { role: "tab", "aria-selected": isActive, onClick: onClick, className: (0, ui_1.cx)(item_module_scss_1.default.item, { [item_module_scss_1.default.itemActive]: isActive }), children: children }));
exports.Item = Item;
