import { keys, registerProvider } from '@debug-panel/dev-panel-sdk';
import { schemaSource } from './schema-source';

export const registerSchemaProvider = () => {
    registerProvider( {
        id: 'schema',
        label: 'Schema',
        order: 3,
        variants: [
            {
                id: 'style-schema',
                label: 'Style',
                source: schemaSource( 'style' ),
                middleware: [ keys ],
            },
            {
                id: 'elements-schema',
                label: 'Elements',
                source: schemaSource( 'elements' ),
                middleware: [ keys ],
            },
        ],
    } );
}


// browsable: true,
// , throttle, log , throttle, log
