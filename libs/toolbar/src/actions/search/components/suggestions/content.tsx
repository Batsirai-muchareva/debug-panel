// TODO fix this dependency cycle with toolbar
import { Box } from '@debug-panel/ui';

import { useToolbar } from '../../../../context/toolbar-context';
import type { ListContentProps } from '../../../../types';
import { useSearch } from '../../context/search-context';
import { useSuggestions } from '../../context/suggestions-context';
import { HighlightMatch } from './highlight-match';
import { SuggestionMeta } from './suggestion-meta';

export const Content = ( { path }: ListContentProps ) => {
    const { query } = useSearch();
    const { dataRef } = useSuggestions();
    const { isValueSearchActive } = useToolbar();

    const parts = path.split( '.' );
    const key = parts[ parts.length - 1 ];
    const parent = parts.slice( 0, -1 ).join( '.' );

    const getKey = ( dfvdfv: string ) => {
        if ( ! isValueSearchActive ) {
            return dfvdfv
        }

        return path.split( '.' ).reduce( ( current, key ) => {
            if ( current !== "object" && current === null ) {
                return null;
            }

            const result = ( current as Record<string, unknown> )[ key ]

            if ( typeof result === "boolean" ) {
                return null;
            }

            return result;
        }, dataRef.current ) as string
    };

    const resolved = getKey( key );

    if ( ! resolved ) {
        return key;
    }

    return (
        <Box style={ { letterSpacing: 0.8 } }>
            <HighlightMatch text={ resolved } query={ query } />
            { parent && (
                <SuggestionMeta path={ parent } />
            ) }
        </Box>
    )
}
