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
exports.useProvidersConfigs = void 0;
const react_1 = require("react");
const providers_1 = require("@debug-panel/providers");
const DEFAULT_ORDER = 10;
const useProvidersConfigs = () => {
    return (0, react_1.useMemo)(() => {
        return getProvidersConfigs().map(({ id, title, variants }) => ({
            id,
            title,
            variants: Object.entries(variants !== null && variants !== void 0 ? variants : {}).map(([, { id, label }]) => ({
                id,
                label,
            })),
        }));
    }, []);
};
exports.useProvidersConfigs = useProvidersConfigs;
const getProvidersConfigs = () => {
    return providers_1.providerRegistry
        .getAll()
        .sort(sortByOrder)
        .map((_a) => {
        var { variants } = _a, provider = __rest(_a, ["variants"]);
        return Object.assign(Object.assign({}, provider), { variants: variants
                .sort(sortByOrder)
                .map((_a) => {
                var { source: _ } = _a, variant = __rest(_a, ["source"]);
                return (Object.assign({}, variant));
            }) });
    });
};
const sortByOrder = (a, b) => {
    var _a, _b;
    return ((_a = a.order) !== null && _a !== void 0 ? _a : DEFAULT_ORDER) - ((_b = b.order) !== null && _b !== void 0 ? _b : DEFAULT_ORDER);
};
