import { createLocatorState } from "./locator-state";
import { parseSourceLine } from "./source-parser";
import type { SourceMap, SourceRange } from "./types";

export function createSourceLocator() {
    let sourceMap: SourceMap = {};

    /* =======================
       Build Index
    ======================= */
    const indexSource = ( json: unknown ) => {
        if ( ! json ) {
            return;
        }

        const lines = JSON.stringify( json, null, 2 ).split( "\n" );
        const state = createLocatorState();

        sourceMap = {};

        for ( let i = 0; i < lines.length; i++ ) {
            parseSourceLine( lines[i], state )?.apply( sourceMap, i + 1 );
        }
    };

    /* =======================
     Reverse Lookup
     ======================= */
    // const locatePathAtLine = ( line: number ): string | undefined => {
    //     let bestMatch: { path: string; range: SourceRange } | undefined;
    //     const smallestRange = Infinity;
    //
    //     // Step 1: find the most specific path
    //     for ( const [ path, range ] of Object.entries( sourceMap ) ) {
    //         if ( range.start === line ) {
    //             bestMatch = { path, range };
    //             break; // exact match found
    //         }
    //     }
    //
    //     if ( ! bestMatch ) {
    //         return undefined;
    //     }
    //
    //     return bestMatch.path;
    // }
    const locatePathAtLine = ( line: number ): string | undefined => {
        let bestMatch: { path: string; range: SourceRange } | undefined;
        let smallestSize = Infinity;

        for ( const [ path, range ] of Object.entries( sourceMap ) ) {
            const { start, end } = range;

            if ( line < start || line > end ) {
                continue;
            }

            const size = end - start;

            // choose the most specific (smallest enclosing range)
            if ( size < smallestSize ) {
                smallestSize = size;
                bestMatch = { path, range };
            }
        }

        return bestMatch?.path;
    };
    // const locatePathAtLine = ( line: number ): string | undefined => {
    //     let bestMatch: { path: string; range: SourceRange } | undefined;
    //     let smallestSize = Infinity;
    //
    //     for ( const [ path, range ] of Object.entries( sourceMap ) ) {
    //         const { start, end } = range;
    //
    //         // Line must be within the range
    //         if ( line < start || line > end ) {
    //             continue;
    //         }
    //
    //         const size = end - start;
    //
    //         // Pick the smallest range that contains the line
    //         if ( size < smallestSize ) {
    //             smallestSize = size;
    //             bestMatch = { path, range };
    //         }
    //     }
    //
    //     return bestMatch?.path;
    // };

    const getSourceMap = () => {
        return sourceMap;
    }

    return {
        indexSource,
        locatePathAtLine,
        getSourceMap,
    };
}
