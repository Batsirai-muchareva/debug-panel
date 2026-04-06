import { isObject } from '../../utils/is-object';
import type { StackItem } from './types';

export const processObject = (
    obj: Record<string, unknown>,
    path: string,
    stack: StackItem[],
    seen: WeakSet<object>,
    onValue: ( path: string ) => void
) => {
    if ( seen.has( obj ) ) {
        return;
    }

    seen.add( obj );

    for ( const key in obj ) {
        if ( ! Object.prototype.hasOwnProperty.call( obj, key ) ) {
            continue;
        }

        const child = obj[key];
        const childPath = path ? `${path}.${key}` : key;

        if ( ! isObject( child ) ) {
            continue;
        }

        onValue( childPath );

        stack.push( { value: child, path: childPath } );
    }
};
