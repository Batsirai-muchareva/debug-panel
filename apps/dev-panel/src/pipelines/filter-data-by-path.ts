import { hasValue } from '../utils/has-value';

export const filterDataByPath = ( data: unknown, path?: string ) => {
    if ( ! path || ! hasValue( data ) ) {
        return data;
    }

    return resolvePath( data, path );
}

/**
 * Resolves a dot/bracket-notation `path` against `data`.
 * Returns `null` when any segment along the path does not exist.
 *
 * @example
 * resolvePath({ a: { b: 1 } }, "a.b")   // 1
 * resolvePath({ a: [1, 2] },   "a[0]")  // 1
 * resolvePath({ a: 1 },        "a.b.c") // null
 */

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

