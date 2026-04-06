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
exports.store = void 0;
const adapter_1 = require("./adapter");
const store = (namespace, scopeKey) => {
    const { read, write } = (0, adapter_1.adapter)(namespace, scopeKey);
    const get = (key) => {
        var _a;
        return (_a = read()[key]) !== null && _a !== void 0 ? _a : null;
    };
    const set = (key, value) => {
        write(Object.assign(Object.assign({}, read()), { [key]: value }));
    };
    const remove = (key) => {
        const _a = read(), _b = key, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        write(rest);
    };
    const all = () => {
        return read();
    };
    // const clear  = (): void => drop();
    return { get, set, remove, all };
};
exports.store = store;
