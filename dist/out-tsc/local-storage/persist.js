"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persist = void 0;
const persist = (namespace, data) => {
    try {
        localStorage.setItem(namespace, JSON.stringify(data));
    }
    catch (_a) {
        console.error(`[${namespace}] Failed to write to localStorage`);
    }
};
exports.persist = persist;
