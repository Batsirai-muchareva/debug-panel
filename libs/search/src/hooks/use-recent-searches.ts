import { useMemo } from 'react';

import { usePath } from '@debug-panel/path';
import { store } from '@debug-panel/storage';

const MAX_RECENT_SEARCHES = 5;

export const useRecentSearches = () => {
    const { path } = usePath();
    const recentSearches = useMemo( () => store.getRecentSearches(), [ path ] );

    return {
        recentSearches: recentSearches.filter( ( p ) => p !== path ),
        addRecentSearches: ( path: string ): void => {
            const searches = store.getRecentSearches();
            const next = [ path, ...searches.filter( p => p !== path ) ].slice( 0, MAX_RECENT_SEARCHES );

            store.setRecentSearches( next );
        }
    }
}
