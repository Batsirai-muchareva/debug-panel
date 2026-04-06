"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAtomicStyleSchema = void 0;
const getAtomicStyleSchema = () => {
    const extendedWindow = window;
    return extendedWindow.elementor.config.atomic.styles_schema;
};
exports.getAtomicStyleSchema = getAtomicStyleSchema;
