import { Data, RawData } from "@libs/types";
import { isObject } from "@libs/utils";

type StackItem = {
    value: unknown;
    path: string;
};

type TraverseOptions = {
    includePrimitivesPath?: boolean;
};

export const traverseData =
    (
        data: RawData,
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


const processPrimitive = (
    value: unknown,
    path: string,
    onValue: (path: string) => void
) => {
    if ( isObject(value) ) {
        const obj = value as Record<string, unknown>;

        for ( const key in obj ) {
            if ( !Object.prototype.hasOwnProperty.call(obj, key) ) continue;

            const child = obj[key];
            if ( !isObject(child) ) {
                const childPath = path ? `${path}.${key}` : key;
                onValue( childPath );
            }
        }
    }
};

const processArray = (
    arr: unknown[],
    basePath: string,
    stack: StackItem[],
    seen: WeakSet<object>,
    onValue: (path: string) => void
) => {
    if ( seen.has( arr ) ) {
        return;
    }

    seen.add( arr );

    if ( arr.length === 0 ) {
        return;
    }

    const first = arr[0];
    if ( ! isObject( first ) ) {
        return;
    }

    const arrPath = `${basePath}[0]`;

    onValue( arrPath );

    stack.push( { value: first, path: arrPath } );
};


const processObject = (
    obj: Record<string, unknown>,
    path: string,
    stack: StackItem[],
    seen: WeakSet<object>,
    onValue: (path: string) => void
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


    // export const traverseData =
//     ( data: Data, onValue: ( path: string ) => void ) => {
//         const stack: Array<{ value: unknown; path: string }> = [];
//
//         if ( isObject( data ) ) {
//             stack.push( { value: data, path: "" } );
//         }
//
//         const seen = new WeakSet<object>(); // Prevent circular loops
//
//         while ( stack.length > 0 ) {
//             const { value, path } = stack.pop()!;
//
//             if ( ! isObject( value ) || seen.has( value ) ) {
//                 continue;
//             }
//
//             seen.add( value );
//
//             for ( const key of Object.keys( value ) ) {
//                 const child = value[key];
//                 const childPath = path ? `${path}.${key}` : key;
//
//                 if ( isObject( child ) ) {
//                     onValue( childPath );
//                     stack.push( { value: child, path: childPath } );
//
//                     if ( Array.isArray( child ) && child.length > 0 ) {
//                         if ( isObject(child[0] ) ) {
//                             const arrPath = `${childPath}[0]`;
//                             onValue( arrPath );
//                             stack.push({ value: child[0], path: arrPath });
//                         }
//                     }
//                 }
//             }
//         }
//     }
