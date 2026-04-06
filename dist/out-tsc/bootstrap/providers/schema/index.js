"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchemaProvider = void 0;
const dev_panel_sdk_1 = require("@debug-panel/dev-panel-sdk");
const schema_source_1 = require("./schema-source");
const registerSchemaProvider = () => {
    (0, dev_panel_sdk_1.registerProvider)({
        id: 'schema',
        title: 'Schema',
        order: 3,
        supportsBrowsing: true,
        variants: [
            {
                id: 'style-schema',
                label: 'Style',
                source: (0, schema_source_1.schemaSource)('style'),
            },
            {
                id: 'elements-schema',
                label: 'Elements',
                source: (0, schema_source_1.schemaSource)('elements'),
            },
        ],
    });
    // registerProvider({
    //   id: '22schema',
    //   title: 'Schema',
    //   order: 3,
    //   supportsBrowsing: true,
    //   variants: [
    //     {
    //       id: 'style-schema',
    //       label: 'Style',
    //       source: schemaSource('style'),
    //     },
    //     {
    //       id: 'elements-schema',
    //       label: 'Elements',
    //       source: schemaSource('elements'),
    //     },
    //   ],
    // });
};
exports.registerSchemaProvider = registerSchemaProvider;
