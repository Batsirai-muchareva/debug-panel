import { useEffect, useState } from 'react';

import type { Variant } from '@debug-panel/providers';

import { useVariant } from './use-variant';


export const useProviderSource = <T = unknown>() => {
    const variant = useVariant();
    const [ data, setData ] = useState< Record< string, unknown > | undefined >( undefined );

    useEffect( () => {
        const source = variant.source as Variant<T>['source'];

        source.subscribe( ( incoming ) => setData( incoming ?? undefined ) );

        return () => source.unsubscribe();
    }, [ variant.id  ] );

    return data;
}
