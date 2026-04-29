import {
    createContext,
    type PropsWithChildren,
    useContext,
} from 'react';

import { useFilteredData } from '../hooks/use-filtered-data';
import { useFilteredDataSync } from '../hooks/use-filtered-data-sync';
import { useProviderSource } from '../hooks/use-provider-source';
import { useRawDataSync } from '../hooks/use-raw-data-sync';
import type { DataState } from '../types';

type ContextValue = {
    data: DataState;
};

const DataContext = createContext< ContextValue | null>( null );

export const DataProvider = ( { children }: PropsWithChildren ) => {
    const payload = useProviderSource();

    useRawDataSync( payload );

    const data = useFilteredData( payload )

    useFilteredDataSync( data.value, payload?.meta )

    return (
        <DataContext.Provider value={ { data } }>
            { children }
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext( DataContext );

    if ( ! context ) {
        throw new Error( "useData must be used within a DataProvider" );
    }

    const { data } = context;

    return {
        isExploring: data.meta?.type === 'keys',
        isEmpty: data.status === 'empty',
        hasNoResults: data.status === 'no-results',
        data: data.status === 'data' ? data.value : null, // think more abt this part
        meta: data.meta,
    };
};
