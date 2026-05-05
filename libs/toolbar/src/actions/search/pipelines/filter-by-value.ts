export const filterByValue = ( data: unknown, query: string ): string[] => {
    if ( ! query || ! isObject( data ) ) {
        return [];
    }

    const needle = query.toLowerCase();
    const paths: string[] = [];

    const walk = ( obj: Record<string, unknown>, prefix: string ) => {
        for ( const [ key, value ] of Object.entries( obj ) ) {
            const path = prefix ? `${ prefix }.${ key }` : key;

            if ( matchesValue( value, needle ) ) {
                paths.push( path );
            }

            if ( isObject( value ) ) {
                walk( value as Record<string, unknown>, path );
            }

            if ( Array.isArray( value ) ) {
                value.forEach( ( item, i ) => {
                    if ( isObject( item ) ) {
                        walk( item as Record<string, unknown>, `${ path }.${ i }` );
                    }
                } );
            }
        }
    };

    walk( data as Record<string, unknown>, '' );

    return paths;
};

const matchesValue = ( value: unknown, needle: string ): boolean => {
    if ( value === null || value === undefined ) {
        return false;
    }

    if ( typeof value === 'string' ) {
        return value.toLowerCase().includes( needle );
    }

    if ( typeof value === 'number' ) {
        return String( value ).includes( needle );
    }

    return false;
};

const isObject = ( value: unknown ): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;
