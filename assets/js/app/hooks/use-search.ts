import { useMemo } from "react";

const MAX_ITEMS = 10;

export const useSearch = ( items: string[], query: string ) => {

    return useMemo( () => items
            .filter( p =>
                normalizeQuery( p ).includes( normalizeQuery( query ) )
            )
        .slice( 0, MAX_ITEMS )
    , [ query, items ] );
}

const normalizeQuery = ( query: string ) => {
    return query.replace( /\.(\d+)(?=\.|$)/g, "[$1]" ) // variants.0 → variants[0]
        .replace( /\[\s*(\d+)\s*]/g, "[$1]" ) // clean spacing
        .toLowerCase();
}
