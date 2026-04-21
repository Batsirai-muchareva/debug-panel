import { useMemo } from 'react';

import { providerRegistry } from '@debug-panel/providers';
import { createCollection } from '@debug-panel/utils';

const DEFAULT_ORDER = 10;

export const useProvidersConfigs = () => {
  return useMemo( () => {
      return createCollection( providerRegistry.getAll() )
          .sort( sortByOrder )
          .adjust( ( { variants }  ) => (
              {
                  variants: createCollection( variants )
                      .sort( sortByOrder )
                      .omit( 'source' )
              } )
          )
      }, [] );
};

const sortByOrder = <T extends { order?: number }>( a: T, b: T ) => {
    return ( a.order ?? DEFAULT_ORDER ) - ( b.order ?? DEFAULT_ORDER );
};



//.map( ( { id, title, variants } ): ProviderConfig => ( {
//         id,
//         title,
//         variants: Object.entries( variants ?? {} ).map(
//           ( [ , { id, label }] ): VariantConfig => ( {
//             id,
//             label,
//           } ),
//         ),
//       } ),
//     )
