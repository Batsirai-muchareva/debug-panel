import { dynamicSegments } from '@debug-panel/path';

import { hasValue } from '../utils/has-value';

export const filterDataByPath = ( data: unknown, path?: string ) => {
    if ( ! path || ! hasValue( data ) ) {
        return data;
    }

    return resolvePath( data, path );
}

const resolvePath = ( data: unknown, path: string ): unknown => {
    if ( ! isObject( data ) ) return null;

    const keys = path.split( /[.[\]]/ ).filter( Boolean );

    return keys.reduce<unknown>( ( current, key ) => {
        if ( ! isObject( current ) ) {
            return null;
        }

        // if segment is dynamic, find the actual key from current data level
        if ( dynamicSegments.isDynamicSegment( key ) ) {
            const actualKey = dynamicSegments.resolveFromData( key, current );
            return actualKey ? ( current as Record<string, unknown> )[ actualKey ] ?? null : null;
        }

        return ( current as Record<string, unknown> )[key] ?? null;
    }, data );
};

const isObject = ( value: unknown ): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

