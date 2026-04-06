export const generateUniquePathSegments = ( path?: string ) => {
    if ( ! path ) {
        return [];
    }

    return path.split( '.' )
        .map( ( segment ) => ( {
            id: generateId(),
            label: segment,
        } ) );
};

const generateId = () => {
    return crypto
        .getRandomValues( new Uint8Array( 3 ) )
        .reduce( ( acc, byte ) =>
            acc + byte.toString( 16 ).padStart( 2, '0' ), ''
        );
}
