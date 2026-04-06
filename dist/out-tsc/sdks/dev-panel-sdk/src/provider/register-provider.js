"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProvider = registerProvider;
const providers_1 = require("@debug-panel/providers");
function registerProvider(definition) {
    providers_1.providerRegistry.add(definition);
}
