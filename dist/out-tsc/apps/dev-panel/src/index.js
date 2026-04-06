"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDataSources = void 0;
const provider_1 = require("@app/providers/database/provider");
const provider_2 = require("@app/providers/editor/provider");
const provider_3 = require("@app/providers/schema/provider");
const source_manager_1 = require("@app/source-manager/source-manager");
const registerDataSources = () => {
    source_manager_1.sourceManager.registerSource(provider_2.editorProvider);
    source_manager_1.sourceManager.registerSource(provider_1.databaseProvider);
    source_manager_1.sourceManager.registerSource(provider_3.schemaProvider);
};
exports.registerDataSources = registerDataSources;
