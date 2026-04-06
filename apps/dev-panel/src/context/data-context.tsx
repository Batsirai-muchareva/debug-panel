import { createContext, type PropsWithChildren, useContext } from 'react';

import { useEffect } from '@wordpress/element';

import { pathIndex, usePath } from '@debug-panel/path';
import { createPipeline } from '@debug-panel/pipeline';
import { sourceLocator } from '@debug-panel/source-locator';

import { useProvider } from '../hooks/use-provider';
import { filterDataByBrowsePath } from '../pipelines/filter-data-by-browse-path';
import { filterDataByPath } from '../pipelines/filter-data-by-path';
import { useBrowsePath } from './browse-context';
import { useToolbar } from '@debug-panel/toolbar';

type ContextValue = { data: unknown; rawData: unknown } | undefined;

const DataContext = createContext< ContextValue >( undefined );

export const DataProvider = ( { children }: PropsWithChildren ) => {
    const rawData = useProvider();
    const { path } = usePath();
    const { browsePath } = useBrowsePath();
    const { isValueSearchActive } = useToolbar();

    useEffect( () => {
        pathIndex.build( filterDataByBrowsePath( rawData, browsePath ), { includePrimitivesPath: isValueSearchActive } );
    }, [ rawData, browsePath ] );

    const runSearch = createPipeline<unknown>()
        .pipe( data => filterDataByBrowsePath( data, browsePath ) )
        .pipe( data => filterDataByPath( data, path ) )
        .build();

    const data = runSearch( rawData );

    sourceLocator.indexSource( data );

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
