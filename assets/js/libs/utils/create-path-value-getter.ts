import { Data } from "@app/types";

type DataGetter = ( path: string ) => Data;

export const createPathValueGetter = ( data: Data ): DataGetter => {
    return ( path: string ): Data => {
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

            return current as Data;
        } catch {
            return null;
        }
    }
};

const isObject = ( value: unknown ): value is object =>
    typeof value === "object" && value !== null;
