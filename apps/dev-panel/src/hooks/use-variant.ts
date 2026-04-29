import { useMemo } from 'react';

import { providerRegistry } from '@debug-panel/providers';

import { useTabs } from '../context/tabs-context';

export const useVariant  = () => {
    const { variant } = useTabs();

    return useMemo( () => {
        const found = providerRegistry.findVariant( variant.id );

        if ( ! found ) {
            throw Error( `Variant not found for id ${ variant.id }` )
        }

        return found;

       }, [ variant.id ] );
}
