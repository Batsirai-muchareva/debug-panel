"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapter = void 0;
const deserialize_1 = require("./local-storage/deserialize");
const persist_1 = require("./local-storage/persist");
const adapter = (namespace, scopeKey) => {
    return {
        read: () => {
            var _a;
            const raw = (0, deserialize_1.deserialize)(namespace);
            return scopeKey ? (_a = raw[scopeKey]) !== null && _a !== void 0 ? _a : {} : raw;
        },
        write: (data) => {
            if (scopeKey) {
                (0, persist_1.persist)(namespace, Object.assign(Object.assign({}, (0, deserialize_1.deserialize)(namespace)), { [scopeKey]: data }));
            }
            else {
                (0, persist_1.persist)(namespace, data);
            }
        },
        // drop: (): void => {
        //     if ( scopeKey ) {
        //         const raw = parse( namespace );
        //
        //         delete raw[scopeKey];
        //
        //         persist( namespace, raw );
        //     } else {
        //         localStorage.removeItem( namespace );
        //     }
        // },
    };
};
exports.adapter = adapter;
