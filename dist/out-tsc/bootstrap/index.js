"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProviders = void 0;
const schema_1 = require("./providers/schema");
const initProviders = () => {
    (0, schema_1.registerSchemaProvider)();
};
exports.initProviders = initProviders;
