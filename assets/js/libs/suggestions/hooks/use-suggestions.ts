import React from "react";
import { useMemo } from "@wordpress/element";

import { pathIndex } from "@libs/path-index";

// import { pathIndexes } from "@libs/data-indexes";
import { useFilteredPaths } from "@app/hooks/use-filtered-paths";
import { getValueTypes, resolveValueType } from "@app/suggestions/register-value-types";

export interface PathSuggestion {
    path: string;
    value: string;
    type: string;
}

export interface SuggestionCategory {
    key: string;
    name: string;
    icon: React.ReactNode;
    label: string;
    items: PathSuggestion[];
}

export const useSuggestions = () => {
    const { paths } = useFilteredPaths();

    return useMemo(
        () => buildSuggestions( paths ),
        [ paths ]
    )
};

export const buildSuggestions = ( paths: string[] ): SuggestionCategory[] => {
    const valueTypes = getValueTypes();
    // const getDataAtPath = pathIndexes.getValue;

    const grouped: Record<string, PathSuggestion[]> = {};

    for ( const handler of valueTypes ) {
        grouped[handler.type] = [];
    }

    for ( const path of paths ) {
        const value = pathIndex.get();
        const handler = resolveValueType( value );

        if ( ! handler ) {
            continue;
        }

        if ( handler.isEmpty?.( value ) ) {
            continue;
        }

        grouped[handler.type].push( {
            path,
            type: handler.type,
            value: handler.format( value ),
        } );
    }

    return valueTypes
        .map( handler => ( {
            key: handler.type,
            name: handler.meta.name,
            icon: handler.meta.icon,
            label: handler.meta.label,
            items: grouped[handler.type].slice( 0, 10 ),
        } ) )
        .filter( category => category.items.length > 0 );
};


// const suggestions = useMemo( () => {
//     const grouped: Record<string, PathSuggestion[]> = {};
//     const valueTypes = getValueTypes();
//
//     for ( const handler of valueTypes ) {
//         grouped[handler.type] = [];
//     }
//
//     filteredPaths.forEach( path => {
//         const value = getDataAtPath( path );
//         const handler = resolveValueType( value );
//
//         if ( handler.isEmpty?.( value ) ) {
//             return;
//         }
//
//         // how about i want to filter empty values
//         grouped[ handler.type ].push( {
//             path,
//             type: handler.type,
//             value: handler.format(value)
//         } );
//     } );
//
//     return valueTypes
//         .map( handler  => ({
//             key: handler.type,
//             name: handler.meta.name,
//             icon: handler.meta.icon,
//             label: handler.meta.label,
//             items: grouped[handler.type].slice(0, 10)
//         }))
//         .filter( cat => cat.items.length > 0 );
//
// }, [ filteredPaths ]);
