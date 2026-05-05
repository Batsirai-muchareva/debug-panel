import { createLocatorState } from "./locator-state";
import { parseSourceLine } from "./source-parser";
import type {
    LinePathMap,
    SourceLocation,
    SourceMap,
    SourceRange,
} from './types';

export function createSourceLocator() {
    let sourceMap: SourceMap = {};
    const linePathMap: LinePathMap = {};

    /* =======================
       Build Index
    ======================= */
    const indexSource = ( json: unknown ) => {
        if ( ! json ) {
            return;
        }

        const lines = JSON.stringify( json, null, 2 ).split( '\n' );
        const state = createLocatorState();

        sourceMap = {};

        for ( let i = 0; i < lines.length; i++ ) {
            const lineNo = i + 1;
            const result = parseSourceLine( lines[i], state );

            if ( result ) {
                result?.apply( sourceMap, lineNo );

                const path = Object.keys( sourceMap ).at( -1 );

                if ( path ) {
                    linePathMap[lineNo] = path;
                }
            }
        }
    };

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

    const getSourceMap = () => {
        return sourceMap;
    };

    function getLocationAtLine(
        lineNo: number,
    ): SourceLocation | null {
        if ( linePathMap[lineNo] ) {
            return { path: linePathMap[lineNo], lineNo };
        }

        for ( let i = lineNo - 1; i >= 1; i-- ) {
            if ( linePathMap[i] ) {
                return { path: linePathMap[i], lineNo: i };
            }
        }

        return null;
    }

    return {
        indexSource,
        locatePathAtLine,
        getSourceMap,
        getLocationAtLine,
    };
}
