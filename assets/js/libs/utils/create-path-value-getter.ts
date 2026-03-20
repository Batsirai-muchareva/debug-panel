type DataGetter = ( path: string ) => unknown;

export const createPathValueGetter = ( data: unknown ): DataGetter => {
    return ( path: string ): unknown => {
        if ( ! isObject( data ) ) {
            return null;
        }

        try {
            const keys = path
                .split( /[.\[\]]/ )
                .filter( Boolean );

            let current: unknown = data;

            for ( let key of keys ) {
                if ( ! isObject( current ) ) {
                    return null
                }

                current = current[ key as keyof typeof current ];
            }

            return current as unknown;
        } catch {
            return null;
        }
    }
};

const isObject = ( value: unknown ): value is object =>
    typeof value === "object" && value !== null;
