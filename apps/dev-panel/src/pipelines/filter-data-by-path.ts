import { hasValue } from '../utils/has-value';

export const filterDataByPath = ( data: unknown, path?: string ) => {
    if ( ! path || ! hasValue( data ) ) {
        return data;
    }

    return resolvePath( data, path );
}

const resolvePath = ( data: unknown, path: string ): unknown => {
    if ( !isObject( data ) ) return null;

    const keys = path.split( /[.[\]]/ ).filter( Boolean );

    return keys.reduce<unknown>( ( current, key ) => {
        if ( ! isObject( current ) ) {
            return null;
        }
        return ( current as Record<string, unknown> )[key] ?? null;
    }, data );
};

const isObject = ( value: unknown ): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

