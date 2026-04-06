export const filterByPath = ( data: string[], path: string ) => {
    if ( ! path ) {
        return data;
    }

    const prefix = path.toLowerCase() + '.';

    return data.filter( p => p.toLowerCase().startsWith( prefix ) );
}
