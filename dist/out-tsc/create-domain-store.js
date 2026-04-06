"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomainStore = void 0;
const create_storage_1 = require("./create-storage");
const storage = (0, create_storage_1.createStorage)('debug-panel');
const createDomainStore = () => {
    let scopedStore;
    return {
        scope: (scopeKey) => {
            scopedStore = storage.scope(scopeKey);
        },
        getPath: () => {
            scopedStore.get('path');
        },
        setPath: (value) => {
            scopedStore.set('path', value);
        },
        getRecentSearches: () => {
            return scopedStore.get('recent-searches');
        },
        addRecentSearch: (path) => {
            var _a;
            const current = (_a = scopedStore.get('recent-searches')) !== null && _a !== void 0 ? _a : [];
            const next = [path, ...current.filter(p => p !== path)];
            scopedStore.set('recent-searches', next);
        },
        getToolbarState: (key) => {
            return storage.unscoped.get(`toolbar:${key}`);
        },
        setToolbarState: (key, value) => {
            storage.unscoped.set(`toolbar:${key}`, value);
        }
    };
};
exports.createDomainStore = createDomainStore;
