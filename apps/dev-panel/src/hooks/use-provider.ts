import { useEffect, useState } from 'react';

import { providerRegistry, type Variant } from '@debug-panel/providers';
import { useTabs } from '@debug-panel/tabs';

export const useProvider = <T = unknown>() => {
    const { id: variantId } = useTabs();
    const [ data, setData ] = useState< Record< string, unknown > | undefined >( undefined );

    useEffect( () => {
        const variant = providerRegistry.findVariant( variantId );

        if ( ! variant ) {
            throw new Error( `[DevPanel] Variant "${ variantId }" not found` );
        }

        const source = variant.source as Variant<T>['source'];

        source.subscribe( ( incoming ) => setData( incoming ?? undefined ) );

        return () => source.unsubscribe();
    }, [ variantId ] );

    return data;
}
