import { isObject } from '../../utils/is-object';

export const processPrimitive = (
    value: unknown,
    path: string,
    onValue: ( path: string ) => void
) => {
    if ( isObject( value ) ) {
        const obj = value as Record<string, unknown>;

        for ( const key in obj ) {
            if ( !Object.prototype.hasOwnProperty.call( obj, key ) ) continue;

            const child = obj[key];
            if ( ! isObject( child ) ) {
                const childPath = path ? `${path}.${key}` : key;
                onValue( childPath );
            }
        }
    }
};

