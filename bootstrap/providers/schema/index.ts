import { registerProvider } from '@debug-panel/dev-panel-sdk';

import { schemaSource } from './schema-source';

export const registerSchemaProvider = () => {
    registerProvider( {
        id: 'schema',
        title: 'Schema',
        order: 3,
        browsable: true,
        variants: [
            {
                id: 'style-schema',
                label: 'Style',
                source: schemaSource( 'style' ),
            },
            {
                id: 'elements-schema',
                label: 'Elements',
                source: schemaSource( 'elements' ),
            },
        ],
    } );

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
}
