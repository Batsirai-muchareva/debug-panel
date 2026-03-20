import { sourceLocator } from "@libs/source-locator";

import { Change, LineRange } from "../types";

const MAX_CHANGES = 3;

/**
 * Applies the noise policy — too many changes at once
 * means something structural changed (e.g. full data swap),
 * not worth highlighting individual lines.
 */
export const applyPolicy = ( changes: Change[] ): Change[] => {
    return changes.length > MAX_CHANGES ? [] : changes;
};

/**
 * Maps Change paths to line ranges via the source map.
 * Paths not found in the source map are silently dropped.
 */
export const changesToLineRanges = ( changes: Change[] ): LineRange[] => {
    const sourceMap = sourceLocator.getSourceMap();

    return changes
        .filter( ( change ) => !! sourceMap[ change.path ] )
        .map( ( change ) => {
            const range = sourceMap[ change.path ];
            return {
                startLine: range.start,
                endLine: range.end,
            };
        } );
};

/**
 * Expands LineRange[] into individual line numbers.
 * e.g. { startLine: 5, endLine: 7 } → [5, 6, 7]
 */
export const lineRangesToLines = ( ranges: LineRange[] ): number[] => {
    return ranges.flatMap( ( { startLine, endLine } ) => {
        if ( startLine === undefined ) return [];

        const end = endLine ?? startLine;

        return Array.from(
            { length: end - startLine + 1 },
            ( _, i ) => startLine + i
        );
    } );
};

/**
 * Finds the best line to scroll to — the midpoint of the
 * largest changed range. Falls back to null if no ranges.
 */
export const findScrollTarget = ( ranges: LineRange[] ): number | null => {
    return ranges.reduce<{ line: number | null; maxRange: number }>(
        ( acc, { startLine, endLine } ) => {
            if ( startLine === undefined ) return acc;

            const end = endLine ?? startLine;
            const size = end - startLine;

            if ( size <= acc.maxRange ) return acc;

            return {
                maxRange: size,
                line: Math.floor( ( startLine + end ) / 2 ),
            };
        },
        { line: null, maxRange: -1 }
    ).line;
};
