export function isNotEmpty<T>(
    value: T | null | undefined
): value is T {
    if ( value == null ) {
        return false;
    }

    if ( typeof value === 'string' ) {
        return value.trim().length > 0;
    }

    if ( Array.isArray( value ) ) {
        return value.length > 0;
    }

    if ( value instanceof Map || value instanceof Set ) {
        return value.size > 0;
    }

    if ( typeof value === 'object' ) {
        return Object.keys( value as object ).length > 0;
    }

    return true;
}
