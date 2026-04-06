"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAtomicElementsSchema = void 0;
const getAtomicElementsSchema = () => {
    const extendedWindow = window;
    return Object.fromEntries(Object.entries(extendedWindow.elementor.widgetsCache)
        .filter(([_, { atomic }]) => atomic)
        .map(([key, { atomic_props_schema }]) => [key, Object.assign({}, atomic_props_schema)]));
};
exports.getAtomicElementsSchema = getAtomicElementsSchema;
