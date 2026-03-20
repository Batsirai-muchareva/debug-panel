/**
 * Extracts the last segment from a dot-separated path.
 *
 * @example
 * getPathTail( 'settings.title.value' ) // → 'value'
 * getPathTail( 'settings' )             // → 'settings'
 */
export const getPathTail = ( path?: string | null ): string => {
    if ( path === undefined || path === null ) {
        return ''
    }

    return path.split( '.' ).pop() ?? path;
};
