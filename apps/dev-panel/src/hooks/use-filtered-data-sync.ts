import { useLayoutEffect } from 'react';

import type { Payload } from '@debug-panel/providers';
import { sourceLocator } from '@debug-panel/source-locator';


export const useFilteredDataSync = ( data: unknown, meta?: Payload['meta'] ) => {
    useLayoutEffect( () => {
        if ( meta && meta.type !== 'keys' ) {
            sourceLocator.indexSource( data );
        }
    }, [ meta?.timestamp ] );
};
