import { elementorAdapter } from "@libs/adapters";

import { createSource } from "@app/source-manager/create-source";

export type SchemaData = Record<string, unknown>;

export type SourceConfig = { schemaKey: 'style' | 'interaction' | 'elements' };

export const schemaSource = createSource<SchemaData, SourceConfig>( ( notify, config) => {
    return {
        setup: () => {
            notify( elementorAdapter.schemaTypes[ config.schemaKey ]() );
        }
    }
} );
