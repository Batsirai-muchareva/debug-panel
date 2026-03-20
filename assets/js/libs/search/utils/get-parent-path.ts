/**
 * Removes the last segment from a dot-separated path.
 * Returns empty string if already at root.
 *
 * @example
 * getParentPath( 'settings.title.value' ) // → 'settings.title'
 * getParentPath( 'settings' )             // → ''
 */
export const getParentPath = ( path: string ): string => {
    const parts = path.split( '.' );

    return parts.length <= 1 ? '' : parts.slice( 0, -1 ).join( '.' );
};
