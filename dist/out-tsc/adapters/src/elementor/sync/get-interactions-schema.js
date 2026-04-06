"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInteractionsSchema = void 0;
const getInteractionsSchema = () => {
    const extendedWindow = window;
    return extendedWindow.elementor.config.atomic.interactions_schema;
};
exports.getInteractionsSchema = getInteractionsSchema;
