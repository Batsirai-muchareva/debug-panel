import { useLayoutEffect } from 'react';

import { pathIndex } from '@debug-panel/path';
import type { Payload } from '@debug-panel/providers';
import { useToolbar } from '@debug-panel/toolbar';

export const useRawDataSync = ( payload: Payload | null ) => {
    const { isValueSearchActive } = useToolbar();

    useLayoutEffect( () => {
        pathIndex.build( payload?.data, { includePrimitivesPath: isValueSearchActive } );
    }, [ payload?.meta.timestamp ] );
};
