import React, { useCallback } from "react";
import { useRef } from "@wordpress/element";

import { pathIndex22, usePath } from "@libs/path";

import { buildPath } from "../utils/build-path";
import { getParentPath } from "../utils/get-parent-path";
import { getPathTail } from "../utils/get-path-tail";

/**
 * Owns all path-building and navigation logic for the search input.
 *
 * Responsibilities:
 * - Committing a segment via dot (settings. → path: settings, query: '')
 * - Committing a segment via exact match (typing 'settings' → path: settings)
 * - Walking path back when query diverges from the committed tail
 * - Restoring the last removed segment on backspace
 *
 * NOT responsible for:
 * - UI rendering
 * - Suggestion filtering
 * - Recent searches
 * - Open/close state
 *
 * `setQuery` is injected rather than read from context to avoid
 * circular dependency — this hook is instantiated inside SearchProvider.
 */
export const usePathQuery = ( setQuery: ( q: string ) => void ) => {
    const { path: pathhh, setPath } = usePath();
    const pathRef = useRef(pathhh);
    pathRef.current = pathhh; // sync every render

    /**
     * Tracks the tail segment that was auto-removed by handlePathDiverged.
     * Allows backspace on empty input to restore it one level at a time.
     */
    const lastRemovedSegment = useRef<string | null>( null );

    /**
     * Called when user types a dot after a segment.
     * If base matches current tail → already committed, just clear input.
     * If base matches a valid next path → commit and clear input.
     * Otherwise → strip the dot, keep typing.
     */
    const commitSegment = ( segment: string ) => {
        const currentTail = getPathTail( pathRef.current );

        if ( currentTail.toLowerCase() === segment.toLowerCase() ) {
            setQuery( '' );
            return;
        }

        const candidate = buildPath( pathRef.current, segment );

        if ( ! pathIndex22.exists( candidate ) ) {
            setQuery( segment );
            return;
        }

        setPath( candidate );
        setQuery( '' );
    };

    /**
     * Checks if the current query exactly matches a known path (or extension of current path).
     * If matched → commits the path and syncs query to the matched tail segment.
     * Returns true if handled so the pipeline can short-circuit.
     */
    const exactMatch = ( query: string ): boolean => {
        const candidate = buildPath( pathRef.current, query );

        if ( ! pathIndex22.exists( candidate ) ) {
            return false;
        }

        const lastSegment = candidate.split( '.' ).pop() ?? candidate;

        setPath( candidate );
        setQuery( lastSegment );

        return true;
    };

    /**
     * Called when no exact match is found for the current query.
     * If the query is still a prefix of the current path tail, the user is
     * backspacing the committed segment — walk the path back one level.
     *
     * Only applies to multi-segment paths. Single segment paths are cleared
     * naturally when handleExactMatch stops matching.
     */
    const handlePathDiverged = useCallback( ( query: string ) => {
        const path = pathRef.current; // always fresh

        if ( ! path ) return;

        const currentTail = getPathTail( path );

        const isTailPrefix = currentTail.toLowerCase().startsWith( query.toLowerCase() );

        if ( isTailPrefix ) {
            lastRemovedSegment.current = currentTail;
            const parentPath = getParentPath( path );

            setPath( parentPath );

            if ( parentPath === '' && query === '' ) {
                setPath( currentTail )
            }
        } else {
            if ( currentTail !== query ) {
                if ( query.toLowerCase().startsWith( currentTail.toLowerCase() ) ) {
                    const parentPath = getParentPath( path );
                    setPath( parentPath );
                }
            }
        }
    } , [] );

    /**
     * Main entry point — routes each query value through the correct handler.
     * Called on every input change via SearchProvider.
     */
    const setPathQuery = ( query: string ) => {
        if ( query.endsWith( '.' ) ) {
            commitSegment( query.slice( 0, -1 ) );
            return;
        }

        if ( exactMatch( query ) ) {
            return;
        }

        handlePathDiverged( query );
        setQuery( query );
    };

    /**
     * Called from SearchBar when backspace is pressed on an empty input.
     * Restores the last auto-removed segment into the input so the user
     * can continue backspacing one level at a time.
     */
    const onKeyUp = (e : React.KeyboardEvent<HTMLInputElement> ) => {
        if ( e.key === 'Backspace' && e.currentTarget.value === '' ) {
            if ( ! lastRemovedSegment.current && ! pathRef.current ) {
                return;
            }

            const segmentToRestore = lastRemovedSegment.current ?? getPathTail( pathRef.current );

            // if ( segmentToRestore && pathRef.current !== '' ) {
            //     setQuery( segmentToRestore );
            // }

            lastRemovedSegment.current = null;
        }

        if ( e.key === 'Enter' ) {
            const candidate = buildPath( pathRef.current, e.currentTarget.value );

            if ( ! pathIndex22.exists( candidate ) ) {
                setQuery( '' );
                return;
            }
        }

    }

    return { setPathQuery, onKeyUp };
};


/**
 * import React from "react";
 *
 * import { usePath } from "@libs/path";
 *
 * import { useSearch } from "../context/search-context";
 *
 * export const PathCrumb = () => {
 *     const { path, setPath } = usePath();
 *     const { query, setQuery, detRef } = useSearch();
 *
 *     const parts = path ? path.split( '.' ) : [];
 *
 *     // Show pending query segment when:
 *     // 1. There's something typed
 *     // 2. It's not already reflected as the last confirmed segment
 *     const lastSegment = parts[ parts.length - 1 ] ?? '';
 *     const hasPending = query.length > 0 && query.toLowerCase() !== lastSegment.toLowerCase();
 *
 *     if ( ! path && ! hasPending ) {
 *         return null;
 *     }
 *
 *     const navigateTo = ( index: number ) => {
 *         const newPath = parts.slice( 0, index + 1 ).join( '.' );
 *         const segment = parts[ index ];
 *
 *         setPath( newPath );
 *         setQuery( segment );
 *     };
 *
 *     return (
 *         <div className="search-path-row" id="pathRow">
 *             <span className="path-label">Path</span>
 *             <span className="path-crumb" style={{ display: 'flex', alignItems: 'center' }} id="pathCrumb">
 *                 { parts.map( ( part, i ) => {
 *                     const isLast = i === parts.length - 1;
 *
 *                     return (
 *                         <React.Fragment key={ i }>
 *                             <button
 *                                 className="path-crumb-segment"
 *                                 onClick={ () => navigateTo( i ) }
 *                                 style={ {
 *                                     background: 'none',
 *                                     border: 'none',
 *                                     padding: '2px 6px',
 *                                     cursor: isLast && ! hasPending ? 'default' : 'pointer',
 *                                     color: isLast && ! detRef.current && ! hasPending ? '#eee' : '#7ecfaa',
 *                                     font: 'inherit',
 *                                     fontSize: '11px',
 *                                     fontWeight: 500,
 *                                     borderRadius: '4px',
 *                                     fontFamily: 'JetBrains Mono, monospace',
 *                                     textDecoration: 'none',
 *                                     transition: 'background 0.12s, color 0.12s',
 *                                     letterSpacing: '0.02em',
 *                                 } }
 *                                 disabled={ isLast && ! hasPending }
 *                             >
 *                                 { part }
 *                             </button>
 *                             { ( ! isLast || hasPending ) && (
 *                                 <span style={ { color: '#2a5050', margin: '0 3px' } }>›</span>
 *                             ) }
 *                         </React.Fragment>
 *                     );
 *                 } ) }
 *
 *                 { ( hasPending ) && (
 *                     <span
 *                         className="path-crumb-segment path-crumb-pending"
 *                         style={ {
 *                             padding: '2px 6px',
 *                             fontSize: '11px',
 *                             fontFamily: 'JetBrains Mono, monospace',
 *                             // color: '#4a7a6a',       // dimmer than confirmed segments
 *                             opacity: 0.55,
 *                             fontStyle: 'italic',
 *                             pointerEvents: 'none',
 *                             userSelect: 'none',
 *                             color: '#c8a84a',
 *                             letterSpacing: '0.02em',
 *                             borderBottom: '1px dashed rgba(200,168,74,0.4)'
 *                         } }
 *                     >
 *                         { query }
 *                     </span>
 *                 ) }
 *             </span>
 *         </div>
 *     );
 * };
 */
