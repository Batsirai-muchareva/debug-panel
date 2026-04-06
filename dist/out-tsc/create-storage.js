"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorage = void 0;
const store_1 = require("./store");
const createStorage = (namespace) => {
    return {
        scope: (scopeKey) => (0, store_1.store)(namespace, scopeKey),
        unscoped: (0, store_1.store)(namespace)
    };
};
exports.createStorage = createStorage;
