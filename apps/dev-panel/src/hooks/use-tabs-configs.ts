import { useMemo } from 'react';

import { providerRegistry } from '@debug-panel/providers';

const DEFAULT_ORDER = 10;

export type VariantConfig = {
  id: string;
  label: string;
};

export type ProviderConfig = {
  id: string;
  title: string;
  variants: VariantConfig[];
};

export const useTabsConfigs = (): ProviderConfig[] => {
  return useMemo( () => {
    return getProvidersConfigs().map(
      ( { id, title, variants } ): ProviderConfig => ( {
        id,
        title,
        variants: Object.entries( variants ?? {} ).map(
          ( [ , { id, label }] ): VariantConfig => ( {
            id,
            label,
          } ),
        ),
      } ),
    );
  }, [] );
};

const getProvidersConfigs = () => {
    return providerRegistry
        .getAll()
        .sort( sortByOrder )
        .map( ( { variants, ...provider } ) => {
            return {
                ...provider,
                variants: variants
                    .sort( sortByOrder )
                    .map( ( { source: _, ...variant } ) => ( { ...variant } ) ),
            };
        } );
};

const sortByOrder = <T extends { order?: number }>( a: T, b: T ) => {
    return ( a.order ?? DEFAULT_ORDER ) - ( b.order ?? DEFAULT_ORDER );
};
