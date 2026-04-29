import { useMemo } from 'react';

import { usePath } from '@debug-panel/path';
import { createPipeline } from '@debug-panel/pipeline';
import type { Payload } from '@debug-panel/providers';

import { filterDataByPath } from '../pipelines/filter-data-by-path';
import type { DataState } from '../types';

// Right — Payload is the raw subscription shape, DataState is the derived UI state. They're different concerns so they shouldn't live in the same file.
//
// Payload → types.ts (domain/API shape)
// DataState → data-state.ts (UI state, lives next to use-filtered-data)
//
// type ResolvedDataState = {
//     [ K in DataState as K['status'] ]: K;
// }[ DataState['status'] ];

export const useFilteredData = ( payload: Payload | null ): DataState => {
    const { path } = usePath();

    return useMemo( () => {
        const meta = payload?.meta ?? null;

        if ( ! payload?.data ) {
            return { status: 'empty', value: null, meta };
        }

        const runSearch = createPipeline<unknown>()
            .pipe( data => filterDataByPath( data, path ) )
            .build();

        const result = runSearch( payload?.data );

        if ( isEmpty( result ) ) {
            return { status: 'no-results', value: null, meta };
        }

        return { status: 'data', value: result, meta };

    }, [ payload?.meta.timestamp, path ] )
};


const isEmpty = ( data: unknown ): boolean => {
    if ( data === null || data === undefined ) {
        return true;
    }

    if ( Array.isArray( data ) ) {
        return data.length === 0;
    }

    if ( typeof data === 'object' ) {
        return Object.keys( data as object ).length === 0;
    }

    return false;
};
