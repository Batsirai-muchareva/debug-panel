type Nullable<T> = T | null | undefined;

/**
 * Narrows `value` to `T`, confirming it is non-null and non-empty.
 *
 * | Type              | Empty when                  |
 * |-------------------|-----------------------------|
 * | null / undefined  | always                      |
 * | string            | blank or whitespace-only    |
 * | Array             | length === 0                |
 * | Map / Set         | size === 0                  |
 * | plain object      | no own enumerable keys      |
 * | everything else   | never (numbers, booleans…)  |
 */
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns true only for plain `{}` objects — excludes class instances, Arrays,
 * Maps, Sets, Dates, etc. that would otherwise match `typeof x === "object"`.
 */
const isPlainObject = ( value: unknown ): value is Record<string, unknown> =>
    Object.prototype.toString.call( value ) === "[object Object]";
