"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHasData = void 0;
const data_context_1 = require("../context/data-context");
const useHasData = () => {
    const { data } = (0, data_context_1.useData)();
    return !!data;
};
exports.useHasData = useHasData;
