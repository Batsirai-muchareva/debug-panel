type Nullable<T> = T | null | undefined;

export function hasValue<T>( value: Nullable<T> ): value is T {
    if ( value == null ) {
        return false;
    }

    if ( typeof value === "string" ) {
        return value.trim().length > 0;
    }

    if ( Array.isArray( value ) ) {
        return value.length > 0;
    }

    if ( value instanceof Map || value instanceof Set ) {
        return value.size > 0;
    }

    if ( isPlainObject( value ) ) {
        return Object.keys( value ).length > 0;
    }

    return true;
}

const isPlainObject = ( value: unknown ): value is Record<string, unknown> =>
    Object.prototype.toString.call( value ) === "[object Object]";
