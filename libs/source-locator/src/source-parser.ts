import {
    closeScope,
    enterArrayItem,
    enterObjectKey,
    exitArrayItem,
    isInArrayScope,
    isPrimitive,
    openScope,
} from "./locator-state";
import type { LocatorState, SourceMap } from "./types";

export function parseSourceLine( line: string, state: LocatorState ) {
    const trimmed = line.trim();
    const indent = line.length - line.trimStart().length;
    const depth = indent / 2;

    const keyMatch = line.match( /^(\s*)"([^"]+)":/ );

    // ─── Object key ─────────────────────────────
    if ( keyMatch ) {
        return {
            apply( map: SourceMap, lineNo: number ) {
                const path = enterObjectKey( state, keyMatch[2], depth );

                map[path] = { start: lineNo, end: lineNo };

                if ( trimmed.endsWith( "{" ) ) {
                    openScope( state, path, indent, false );
                } else if ( trimmed.endsWith( "[" ) ) {
                    openScope( state, path, indent, true );
                }
            },
        };
    }

    // ─── Array close ────────────────────────────
    if ( trimmed === "]" || trimmed === "]," ) {
        return {
            apply( map: SourceMap, lineNo: number ) {
                const path = closeScope( state, indent );

                if ( path ) {
                    map[ path ].end = lineNo;
                }
            },
        };
    }

    // ─── Object inside array ────────────────────
    if ( trimmed === "{" && isInArrayScope( state ) ) {
        return {
            apply( map: SourceMap, lineNo: number ) {
                const path = enterArrayItem( state, depth );

                map[path] = { start: lineNo, end: lineNo };

                openScope( state, path, indent, false );
            },
        };
    }

    // ─── Object close ───────────────────────────
    if ( trimmed === "}" || trimmed === "}," ) {
        return {
            apply( map: SourceMap, lineNo: number ) {
                const path = closeScope( state, indent );

                if ( path ) {
                    map[ path ].end = lineNo;
                }
            },
        };
    }

    // ─── Primitive in array ─────────────────────
    if ( isInArrayScope( state ) && isPrimitive( trimmed ) ) {
        return {
            apply( map: SourceMap, lineNo: number ) {
                const path = enterArrayItem( state, depth );

                map[path] = { start: lineNo, end: lineNo };

                exitArrayItem( state );
            },
        };
    }

    return null;
}
