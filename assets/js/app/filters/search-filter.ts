import { Data } from "@libs/types";
import { isNotEmpty } from "@libs/utils";
import { createPathValueGetter } from "@libs/utils";

export const searchFilter = ( path?: string ) => {
    return ( data: Data ) => {
        if ( ! path || ! isNotEmpty( data ) ) {
            return data
        }

        const getDataAtPath = createPathValueGetter( data );
        const exactMatch = getDataAtPath( path );

        if ( exactMatch !== undefined ) {
            return exactMatch; // should we return data here instead WDYT
        }

        return findDeepestValidPath( path, getDataAtPath ) ?? data;
    }
}

const findDeepestValidPath = ( path: string, getPathValue: ( path: string ) => any ) => {
    const segments = path.split(".");

    // Gradually reduce segments from full → root
    while ( segments.length > 0 ) {
        const candidatePath = segments.join(".");
        const value = getPathValue( candidatePath );

        if ( value !== undefined ) {
            return value;
        }

        segments.pop(); // remove last segment and try parent
    }

    return null;
};
