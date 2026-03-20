// import React from "react";
//
// import { pathIndex, usePath } from "@libs/path";
//
// import { useSearch } from "../context/search-context";
//
// export const Suggestions = () => {
//     const { query, setQuery } = useSearch();
//     const { setPath } = usePath();
//
//     console.log( pathIndex.get() )
//     // const onSelect = ( item: SuggestionItem ) => {
//     //     setQuery( item.key );   // update input display
//     //     setPath( item.path );   // ← only now does path context update
//     // };
//
//     return (
//         <>
//             <div className="suggestions-section-label">Keys</div>
//             sdfsdfcsd
//         </>
//     )
// }


import React, { useMemo } from "react";
import { useState } from "@wordpress/element";

import { useEventBus } from "@libs/events";
import { SearchIcon } from "@libs/icons";
import { pathIndex, usePath } from "@libs/path";
import { store } from "@libs/storage";

import { useSearch } from "../context/search-context";
import { useSuggestions } from "../context/suggestion-context";
import { SuggestionItem } from "./suggestion-item";

type Category = {
    label: string;
    items: string[];
};

export const SuggestionsPanel = () => {
    const { query, setQuery } = useSearch();
    const { path, setPath } = usePath();
    const { categories, suggestions } = useSuggestions();
    const paths = pathIndex.get();

    // console.log( pathIndex.get() );

    const [ highlighted, setHighlighted ] = useState( 0 )

    // const categories = useMemo( (): Category[] => {
    //     const q = query.toLowerCase();
    //
    //     // When path is set, only show paths that start with it
    //     const scoped = path
    //         ? paths.filter( p => p.toLowerCase().startsWith( path.toLowerCase() + '.' ) )
    //         : paths;
    //
    //     const filtered = scoped.filter( p => {
    //         // Match against the next segment after the current path, not the full string
    //         const remainder = path
    //             ? p.slice( path.length + 1 ) // strip "path." prefix
    //             : p;
    //         const nextSegment = remainder.split( '.' )[ 0 ];
    //         return nextSegment.toLowerCase().includes( q );
    //     } );
    //
    //     // Dedupe by next segment — multiple deep paths can share the same next segment
    //     const seen = new Set<string>();
    //     const uniqued = filtered.filter( p => {
    //         const remainder = path ? p.slice( path.length + 1 ) : p;
    //         const nextSegment = remainder.split( '.' )[ 0 ];
    //         if ( seen.has( nextSegment ) ) return false;
    //         seen.add( nextSegment );
    //         return true;
    //     } );
    //
    //     const keys   = uniqued.filter( p => ! p.includes( '.' ) );
    //     const nested = uniqued.filter( p =>   p.includes( '.' ) );
    //
    //     return [
    //         { label: 'Keys',  items: keys   },
    //         { label: 'Paths', items: nested },
    //     ].filter( cat => cat.items.length > 0 );
    // }, [ paths, query, path ] );
// You're right. Right now EmptyState only shows when categories is empty,
// but categories can be empty for two reasons — no query typed yet (panel just opened)
// OR query typed but nothing matched. It should only show when there's an active query that returned nothing.
    const onSelect = ( path: string ) => {
        // const key = path.split( '.' ).pop() ?? path; // last segment as display
        setQuery( '' );
        setPath( path );
        store.setRecent( path  );

        // addRecent( path );
    };

    // const flatItems = useMemo(
    //     () => categories.flatMap( cat => cat.items ),
    //     [ categories ]
    // );


    // useEventBus( 'search:keydown:arrow', ( payload ) => {
    //     if ( payload === 'down' ) {
    //         setHighlighted( i => Math.min( i + 1, flatItems.length - 1 ) );
    //     }
    //
    //     if ( payload === 'up' ) {
    //         setHighlighted( i => Math.max( i - 1, 0 ) );
    //     }
    // } )
    //
    // useEventBus( 'search:commit', () => {
    //     const selectedPath = flatItems[ highlighted ];
    //     if ( selectedPath ) {
    //         onSelect( selectedPath );
    //     }
    // } );

    const allPaths = pathIndex.get() as string[];

    const pathTail = path?.split( '.' )?.pop() ?? '';
    const queryIsRedundant = pathTail?.toLowerCase() === query?.toLowerCase();
    const fullQuery = [ path, ! queryIsRedundant && query ].filter( Boolean ).join( '.' );
    const noMatches = !! fullQuery && ! allPaths?.some( p =>
        p.toLowerCase().includes( fullQuery.toLowerCase() )
    );

    if ( noMatches ) {
        return (
            <div style={ {
                position: 'absolute',
                background: '#0a1515',
                width: '100%',
                height: '100%',
                zIndex: 9,
                alignItems: 'center',
                display: 'flex',
                paddingTop: '3rem',
                gap: '30px',
                color: '#64748b',
                flexDirection: 'column',
                fontFamily: "'JetBrains Mono', monospace"

            } } className="suggestions-empty">
                <SearchIcon size={ 18 }/>
                <p style={ {
                    fontSize: '0.82rem',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                } }>
                    No matches for <strong style={ { color: '#2dd4bf' } }>"{ query }"</strong>
                </p>
                <div style={{fontSize: '0.7rem'}}>
                    Try a key name like
                    <code style={{color:'#f59e0b'}}>"{ paths[0] }"</code>
                    or
                    <code style={{color:'#f59e0b'}}>"{ paths[1] }"</code></div>
            </div>
        );
    }


    let flatIndex = 0;

    return (
        <>
            { categories.map( ( { label, items } ) => (
                <React.Fragment key={ label }>
                    <div className="suggestions-section-label">{ label }</div>
                    { items.map( ( path ) => {
                        const currentIndex = flatIndex++;

                        return (
                                <SuggestionItem
                                    key={ path }
                                    path={ path }
                                    query={ query }
                                    onSelect={ onSelect }
                                    highlighted={ highlighted === currentIndex }
                                />
                            )
                        }

                    ) }
                </React.Fragment>
            ) ) }
        </>
    );
};
// const categories = useMemo( (): Category[] => {
//     const q = query.toLowerCase();
//
//     const filtered = paths.filter( path =>
//         path.toLowerCase().includes( q )
//     );
//
//     const keys  = filtered.filter( path => ! path.includes( '.' ) );
//     const nested = filtered.filter( path =>   path.includes( '.' ) );
//
//     return [
//         { label: 'Keys',  items: keys   },
//         { label: 'Paths', items: nested },
//     ].filter( cat => cat.items.length > 0 );
// }, [ paths, query ] );




