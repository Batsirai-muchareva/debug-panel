"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = void 0;
const deserialize = (namespace) => {
    try {
        const stored = localStorage.getItem(namespace);
        return stored ? JSON.parse(stored) : {};
    }
    catch (_a) {
        return {};
    }
};
exports.deserialize = deserialize;
