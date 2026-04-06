import type { Change, JsonObject } from "../types";
import { buildPath } from "../utils/build-path";
import { isObject } from "../utils/is-object";

export const jsonDiffs = (
    next: JsonObject,
    prev: JsonObject | null,
    path = ""
): Change[] => {
    if ( ! isObject( next ) || ! isObject( prev ) ) {
        return [];
    }

    return [
        ...detectAdded( next, prev, path ),
        ...detectModified( next, prev, path ),
        ...detectRemoved( next, prev, path ), // TODO do we need to detect removed since we dont highlight of scroll to something not available
    ];
};

const detectAdded = (
    next: JsonObject,
    prev: JsonObject,
    path: string
): Change[] => {
    return Object.keys( next )
        .filter( ( key ) => {
            return !Object.prototype.hasOwnProperty.call( prev, key )
        } )
        .map( ( key ) => ( {
            type: "added" as const,
            path: buildPath( path, key ),
            newValue: next[ key ],
        } ) );
};

const detectModified = (
    next: JsonObject,
    prev: JsonObject,
    path: string
): Change[] => {
    return Object.keys( next )
        .flatMap( ( key ) => {
            if ( ! Object.prototype.hasOwnProperty.call( prev, key ) ) {
                return [];
            }

            const keyPath = buildPath( path, key );
            const nextVal = next[ key ];
            const prevVal = prev[ key ];

            if ( isObject( nextVal ) && isObject( prevVal ) ) {
                return jsonDiffs( nextVal, prevVal, keyPath );
            }

            if ( JSON.stringify( nextVal ) !== JSON.stringify( prevVal ) ) {
                return [ {
                    type: "modified" as const,
                    path: keyPath,
                    oldValue: prevVal,
                    newValue: nextVal,
                } ];
            }

            return [];
        } );
};


const detectRemoved = (
    next: JsonObject,
    prev: JsonObject,
    path: string
): Change[] => {
    return Object.keys( prev )
        .filter( ( key ) => ! Object.prototype.hasOwnProperty.call( next, key ) )
        .map( ( key ) => ( {
            type: "removed" as const,
            path: buildPath( path, key ),
            oldValue: prev[ key ],
        } ) );
};
