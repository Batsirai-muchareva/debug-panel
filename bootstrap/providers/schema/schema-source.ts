import { elementorAdapter } from "@debug-panel/adapters";
import { createSource } from '@debug-panel/dev-panel-sdk';

export type SchemaKey = 'style' | 'interaction' | 'elements';

// define/create data source
export const schemaSource = ( schemaKey: SchemaKey ) => {
  return createSource( ( { notify } ) => {
    return {
      setup: () => {
        notify( elementorAdapter.schemaTypes[schemaKey]() );
      },
    };
  } );
};
