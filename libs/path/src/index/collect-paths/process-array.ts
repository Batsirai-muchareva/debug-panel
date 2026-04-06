import { isObject } from '../../utils/is-object';
import type { StackItem } from './types';

export const processArray = (
    arr: unknown[],
    basePath: string,
    stack: StackItem[],
    seen: WeakSet<object>,
    onValue: ( path: string ) => void
) => {
    if ( seen.has( arr ) ) {
        return;
    }

    seen.add( arr );

    if ( arr.length === 0 ) {
        return;
    }

    for ( let i = 0; i < arr.length; i++ ) {
        const item = arr[i];

        if ( ! isObject( item ) ) {
            continue;
        }

        const arrPath = basePath ? `${basePath}.${i}` : `${i}`;

        onValue( arrPath );

        stack.push( {
            value: item,
            path: arrPath
        } );
    }
};
