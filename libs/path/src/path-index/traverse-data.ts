type StackItem = {
    value: unknown;
    path: string;
};

type TraverseOptions = {
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


const processPrimitive = (
    value: unknown,
    path: string,
    onValue: ( path: string ) => void
) => {
    if ( isObject( value ) ) {
        const obj = value as Record<string, unknown>;

        for ( const key in obj ) {
            if ( !Object.prototype.hasOwnProperty.call( obj, key ) ) continue;

            const child = obj[key];
            if ( !isObject( child ) ) {
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

        if ( !isObject( item ) ) {
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


const processObject = (
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

const isObject = ( v: unknown ): v is Record<string, unknown> => {
    return typeof v === "object" && v !== null;
}
