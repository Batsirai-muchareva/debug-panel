import { pathIndex } from '@debug-panel/path';

type Data = {
    label: string;
    type: string;
    items: string[]
};

export const appendRecentSearches = ( data: Data[], paths: string[], query: string ) => {
    if ( paths.length > 0 && data.length > 0 && ! query ) {

        const filtered = paths.filter( p => pathIndex.exists( p ) )

        if ( filtered.length > 0 ) {
            data.unshift( {
                label: 'Recent Searches',
                type: 'recent',
                items: filtered,
            } );
        }
    }

    return data;
}
