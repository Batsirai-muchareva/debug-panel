import type { LocatorState } from "./types";

const createLocatorState = (): LocatorState => ( {
    pathStack: [],
    arrayStack: [],
    openStack: [],
} );

const enterObjectKey = (
    state: LocatorState,
    key: string,
    depth: number
): string => {
    const parentScope = [ ...state.openStack ]
        .reverse()
        .find( ( entry ) => entry.indent < depth * 2 );

    const parentPath = parentScope?.path ?? '';

    const path = parentPath ? `${ parentPath }.${ key }` : key;

    state.pathStack = parentPath ? [ ...parentPath.split( '.' ), key ] : [ key ];

    return path;
};

const enterArrayItem = (
    state: LocatorState,
    depth: number
): string => {
    const idx = state.arrayStack.length - 1;
    state.arrayStack[ idx ]++;

    const parentScope = [ ...state.openStack ]
        .reverse()
        .find( ( entry ) => entry.indent < depth * 2 );

    const parentPath = parentScope?.path ?? '';
    const index = state.arrayStack[ idx ];
    const path = parentPath ? `${ parentPath }.${ index }` : String( index );

    state.pathStack = path.split( '.' );

    return path;
};

const exitArrayItem = ( state: LocatorState ) => {
    if ( typeof state.pathStack[state.pathStack.length - 1] === "number" ) {
        state.pathStack.pop();
    }
};

const openScope = (
    state: LocatorState,
    path: string,
    indent: number,
    isArray: boolean
) => {
    state.openStack.push( { path, indent, isArray } );

    if ( isArray ) {
        state.arrayStack.push( -1 );
    }
};
const closeScope = (
    state: LocatorState,
    indent: number
): string | null => {
    for ( let i = state.openStack.length - 1; i >= 0; i-- ) {
        const entry = state.openStack[i];
        if ( entry.indent === indent ) {
            state.openStack.splice( i, 1 );

            if ( entry.isArray ) {
                state.arrayStack.pop();
                exitArrayItem( state );
            }

            return entry.path;
        }
    }
    return null;
};

const isInArrayScope = ( state: LocatorState ) => {
    return state.arrayStack.length > 0;
}

const isPrimitive = ( value: string ) => {
    return (
        ! value.startsWith( "{" ) &&
        ! value.startsWith( "}" ) &&
        value !== "]" &&
        value !== "],"
    );
};

export {
    createLocatorState,
    enterObjectKey,
    enterArrayItem,
    isInArrayScope,
    exitArrayItem,
    isPrimitive,
    openScope,
    closeScope
}
