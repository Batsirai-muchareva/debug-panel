import { hasValue } from '../utils/has-value';

export const filterDataByValue = ( data: unknown, query?: string ): unknown => {
    if ( !query || !hasValue( data ) ) {
        return data;
    }

    if ( !isObject( data ) ) {
        return data;
    }

    const needle = query.toLowerCase();
    const result: Record<string, unknown> = {};

    for ( const [ key, value ] of Object.entries( data as Record<string, unknown> ) ) {
        if ( matchesValue( value, needle ) ) {
            result[ key ] = value;
        }
    }

    return result;
};

const matchesValue = ( value: unknown, needle: string ): boolean => {
    if ( value === null || value === undefined ) {
        return false;
    }

    if ( typeof value === 'string' ) {
        return value.toLowerCase().includes( needle );
    }

    if ( typeof value === 'number' || typeof value === 'boolean' ) {
        return String( value ).toLowerCase().includes( needle );
    }

    if ( isObject( value ) ) {
        return Object.values( value as Record<string, unknown> ).some(
            ( child ) => matchesValue( child, needle )
        );
    }

    if ( Array.isArray( value ) ) {
        return value.some( ( item ) => matchesValue( item, needle ) );
    }

    return false;
};

const isObject = ( value: unknown ): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray( value );
