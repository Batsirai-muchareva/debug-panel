import React, { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo } from "@wordpress/element";

import { usePath } from "@libs/path";
import { pathIndex, pathIndex22 } from "@libs/path";
import { sourceLocator } from "@libs/source-locator";
import { Data, RawData } from "@libs/types";

import { searchFilter } from "@app/filters/search-filter";
import { useProvider } from "@app/hooks/use-provider";

const FilteredDataContext = createContext< { data: Data } | undefined >( undefined );

export const FilteredDataProvider = ( { children }: PropsWithChildren ) => {
    const { data: rawData } = useProvider();
    // const { selectedKey } = useBrowse();
    const { path } = usePath();

    useEffect( () => {
        if ( ! Boolean( rawData ) ) {
            return;
        }

        pathIndex.build( rawData );
        pathIndex22.init( pathIndex.get() )
    }, [ rawData ]);

    const applyFilters = useMemo( () =>
            createFilters(
                // filterByKey( selectedKey ),
                searchFilter( path )
            ),
        [ path ] // selectedKey
    );

    const data = useMemo( () => {
        if ( ! rawData ) {
            return null;
        }

        const filtered = applyFilters( rawData );

        // Todo remove this into effects
        sourceLocator.indexSource( filtered );
        // useSyncData( filtered );

        return filtered;
    }, [ rawData, applyFilters ]);

    // sync processed data
    // useSyncData

    return (
        <FilteredDataContext.Provider value={ { data } }>
            { children }
        </FilteredDataContext.Provider>
    );
};

export const useFilteredData = () => {
    const context = useContext( FilteredDataContext );

    if ( ! context ) {
        throw new Error( "useFilteredData must be used within a FilteredDataProvider" );
    }

    return context;
};


const createFilters = <T extends RawData>( ...steps: ( ( input: T ) => T )[] ) => {
    return ( input: T ): Data => {
        return steps.reduce( ( value, step ) => step( value ), input ) as Data;
    }
}
