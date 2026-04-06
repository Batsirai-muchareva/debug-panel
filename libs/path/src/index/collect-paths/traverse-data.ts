import { isObject } from '../../utils/is-object';
import { processArray } from './process-array';
import { processObject } from './process-object';
import { processPrimitive } from './process-primitive';
import type { StackItem } from './types';

export type TraverseOptions = {
    includePrimitivesPath?: boolean;
};

export const traverseData =
    (
        data: unknown,
        onValue: ( path: string ) => void,
        options: TraverseOptions = {}
    ) => {
        if ( ! isObject( data ) ) {
            return;
        }

        const stack: StackItem[] = [{ value: data, path: "" }];
        const seen = new WeakSet<object>(); // Prevent circular loops

        while ( stack.length > 0 ) {
            const { value, path } = stack.pop() as StackItem;

            if ( ! isObject( value ) ) {
                continue;
            }

            if ( seen.has( value ) ) {
                continue;
            }

            if ( Array.isArray( value ) ) {
                processArray( value, path, stack, seen, onValue );
            } else {
                processObject( value, path, stack, seen, onValue );
            }

            if ( options.includePrimitivesPath ) {
                processPrimitive( value, path, onValue );
            }
        }
    }






