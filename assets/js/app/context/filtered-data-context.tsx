import React, { useMemo } from "react";
import { PropsWithChildren } from "react";
import { createContext, useContext } from "@wordpress/element";
import { useProvider } from "@app/hooks/use-provider";
import { useBrowse } from "@app/context/browse-context";
import { usePath } from "@app/context/path-context";
import { Data } from "@app/types";
import { createFilter } from "@app/context/filtered-data/create-filter";
import { filterByKey } from "@app/context/filtered-data/filters/filter-by-key";
import { searchFilter } from "@app/context/filtered-data/filters/search-filter";
import { usePathIndexSync } from "@app/hooks/use-path-index-sync";
import { lineMap } from "@libs/data-indexes";

const FilteredDataContext = createContext< { data: Data } | undefined >( undefined );

export const FilteredDataProvider = ( { children }: PropsWithChildren ) => {
    const { data: rawData } = useProvider();
    const { selectedKey } = useBrowse();
    const { path } = usePath();

    usePathIndexSync( rawData );

    const applyFilters = useMemo(
        () =>
            createFilter(
                filterByKey(selectedKey),
                searchFilter(path)
            ),
        [ selectedKey, path ]
    );

    const data = useMemo( () => {
        if ( ! rawData ) {
            return null;
        }

        const filtered = applyFilters( rawData );

        lineMap.buildLineMap( filtered );

        return filtered;
    }, [ rawData, applyFilters ]);

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
