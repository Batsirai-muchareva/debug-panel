import { createContext, type PropsWithChildren, useContext } from 'react';
import { useEffect } from 'react';

import { pathIndex, usePath } from '@debug-panel/path';
import { createPipeline } from '@debug-panel/pipeline';
import { sourceLocator } from '@debug-panel/source-locator';
import { useToolbar } from '@debug-panel/toolbar';

import { useProviderSource } from '../hooks/use-provider-source';
import { filterDataByBrowsePath } from '../pipelines/filter-data-by-browse-path';
import { filterDataByPath } from '../pipelines/filter-data-by-path';
import { useBrowsePath } from './browse-context';
import { useProvider } from '../hooks/use-provider';

type ContextValue = { data: unknown; rawData: unknown } | undefined;

const DataContext = createContext< ContextValue >( undefined );

export const DataProvider = ( { children }: PropsWithChildren ) => {
    const rawData = useProviderSource();
    const { path } = usePath();
    const { browsePath } = useBrowsePath();
    const { isValueSearchActive } = useToolbar();
    const { browsable = false } = useProvider();

    useEffect( () => {
        pathIndex.build( filterDataByBrowsePath( rawData, browsePath ), { includePrimitivesPath: isValueSearchActive } );
    }, [ rawData, browsePath ] );

    const runSearch = createPipeline<unknown>()
        .pipe( data => filterDataByBrowsePath( data, browsePath ) )
        .pipe( data => filterDataByPath( data, path ) )
        .build();

    const data = runSearch( rawData );

    if ( ! browsable || browsePath ) {
        sourceLocator.indexSource( data );
    }

    return (
        <DataContext.Provider value={ { data, rawData } }>
            { children }
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext( DataContext );

    if ( ! context ) {
        throw new Error( "useData must be used within a DataProvider" );
    }

    return context;
};
