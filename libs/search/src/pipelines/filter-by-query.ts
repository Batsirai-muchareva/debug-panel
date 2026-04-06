export const filterByQuery = ( data: string[], query: string ) => {
    if ( ! query ) {
        return data;
    }

    const loweredQuery = query.toLowerCase();
    return data.filter( p => {
        const lastSegment = p.split( '.' ).at( -1 ) ?? p;
        return lastSegment.toLowerCase().includes( loweredQuery );
    } );
    // return data.filter( p => p.toLowerCase().includes( loweredQuery ) );
}
