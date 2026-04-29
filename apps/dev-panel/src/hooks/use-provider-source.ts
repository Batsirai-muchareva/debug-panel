import { useLayoutEffect, useState } from 'react';

import type { Payload } from '@debug-panel/providers';

import { useVariant } from './use-variant';

export const useProviderSource = () => {
    const variant = useVariant();
    const [ data, setData ] = useState< Payload | null >( null );

    useLayoutEffect( () => {
        const source = variant.source;

        source.subscribe( ( incoming ) => setData( incoming ) );

        return () => source.unsubscribe();
    }, [ variant.id  ] );

    return data;
}
