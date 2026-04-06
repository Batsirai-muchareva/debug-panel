"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaSource = void 0;
const adapters_1 = require("@debug-panel/adapters");
const dev_panel_sdk_1 = require("@debug-panel/dev-panel-sdk");
const schemaSource = (schemaKey) => {
    return (0, dev_panel_sdk_1.createSource)(({ notify }) => {
        return {
            setup: () => {
                notify(adapters_1.elementorAdapter.schemaTypes[schemaKey]());
            },
        };
    });
};
exports.schemaSource = schemaSource;
