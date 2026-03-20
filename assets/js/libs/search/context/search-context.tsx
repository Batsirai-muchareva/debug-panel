import React, { PropsWithChildren } from "react"
import { createContext, useContext, useState } from "@wordpress/element";

import { usePathQuery } from "../hooks/use-path-query";

type SearchState = {
    query: string;
    setQuery: ( q: string ) => void;
    setRawQuery: ( q: string ) => void;
    onKeyUp: any;
};

const SearchContext = createContext<SearchState | undefined>( undefined );

export const SearchProvider = ( { children }: PropsWithChildren ) => {
    const [ query, setQuery ] = useState<string>('');
    const { setPathQuery, onKeyUp } = usePathQuery( setQuery );

    // when searching like I am searching to differ from the rest

    return (
        <SearchContext.Provider value={ {
            query,
            setQuery: setPathQuery,
            onKeyUp,
            setRawQuery: setQuery
        } }>
            { children }
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext( SearchContext );

    if ( ! context ) {
        throw new Error( 'useSearch must be within SearchProvider' );
    }

    return context;
};

// const [ recentSearches, setRecentSearches ] = useState<string[]>( () => {
//     return debugStorage.get( `recent-searches:${ variantId }` ) ?? [];
// } );
//
// useEffect( () => {
//     const storedRecents = debugStorage.get( `recent-searches:${ variantId }` );
//
//     setRecentSearches( storedRecents ?? [] );
// }, [ variantId ] );

// const addRecent = ( path: string ) => {
//     setRecentSearches( prev => {
//         const next = [ path, ...prev.filter( p => p !== path ) ].slice( 0, 5 );
//
//         // TODO expose fxns atleast than the strings
//         debugStorage.set( `recent-searches:${ variantId }`, next );
//
//         return next;
//     } );
// };


/**
 *
 *
 * const deriveQuery = ( path: string ) => path?.split( '.' )?.pop() ?? path ?? '';
 *
 * // libs/path/utils.ts
 *
 * // // TODO Query this ounce its too expensive
 * // const exactMatch = pathIndex.get().find( ( p: string ) => p.toLowerCase() === q.toLowerCase() );
 *     // const { path } = usePath(); deriveQuery( path )
 *     const setPathQuery = ( searchQuery: string ) => {
 *         const paths = pathIndex.get() as string[];
 *
 *         if ( searchQuery.endsWith( '.' ) ) {
 *             handleDotCommit( searchQuery.slice( 0, -1 ), paths );
 *             return;
 *         }
 *
 *         // setQuery( searchQuery );
 *
 *
 *         const matched = handleExactMatch( searchQuery, paths );
 *
 *         if ( matched ) {
 *             return;
 *         }
 *
 *         handlePathDiverged( searchQuery );
 *
 *         // no path mutation on normal typing
 *         setQuery( searchQuery );
 *
 *         //
 *         // handleQueryDiverged( searchQuery );
 *
 *         // handleNoMatch( searchQuery );
 *     };
 *     const handlePathDiverged222 = ( searchQuery: string ) => {
 *         if ( ! path ) return;
 *
 *         const parts = path.split( '.' );
 *         const tail = parts[ parts.length - 1 ];
 *         const isTailPrefix = tail.toLowerCase().startsWith( searchQuery.toLowerCase() );
 *
 *         if ( isTailPrefix ) {
 *             setPath( parts.length <= 1 ? '' : parts.slice( 0, -1 ).join( '.' ) );
 *         }
 *     };
 *
 *     const handlePathDiverged = ( searchQuery: string ) => {
 *         if ( ! path ) return;
 *
 *         // const tail = path.split( '.' ).pop() ?? '';
 *         const parts = path.split( '.' );
 *         const tail = parts[ parts.length - 1 ];
 *         const isTailPrefix = tail.toLowerCase().startsWith( searchQuery.toLowerCase() );
 *
 *         // path = settings
 *         // query = ti
 *         // candidate settings.ti
 *
 *         // const valid = buildCandidatePath( path, searchQuery ).toLowerCase().startsWith( path );
 *
 *         if ( parts.length <= 1 ) {
 *             if ( isTailPrefix ) {
 *                 setPath( '' );
 *             }
 *             // backspace
 *             // typing the next segment
 *             // The answer is already in the relationship between query and tail:
 *             //
 *             // Case 1: settings starts with settin ✅ — query is a prefix of the tail, user is backspacing
 *             // Case 2: settings starts with ti ❌ — query is NOT a prefix of the tail, user is typing a new segment
 *         }  else {
 *             if ( isTailPrefix ) {
 *                 setPath( parts.slice( 0, -1 ).join( '.' ) );
 *             }
 *         }
 *         // console.log( valid )
 *         // // If query was empty before this keystroke, user is typing a NEW segment
 *         // // under the current path — don't touch path at all
 *         // const previousQueryWasEmpty = query === '';
 *         // if ( previousQueryWasEmpty ) return;
 *         //
 *         // // User is editing the tail segment — check if it still matches
 *         // const stillMatchesTail = tail.toLowerCase().startsWith( searchQuery.toLowerCase() );
 *         //
 *         // if ( ! stillMatchesTail ) {
 *         //     setPath( '' );
 *         //     return;
 *         // }
 *
 *         // Backspacing into prefix of tail — clear this path level
 *         // if ( parts.length <= 1 ) {
 *         //     setPath( '' );
 *         // } else {
 *         //     setPath( parts.slice( 0, -1 ).join( '.' ) );
 *         // }
 *     };
 *     // const handlePathDiverged = ( searchQuery: string ) => {
 *     //     if ( ! path ) return;
 *     //
 *     //     const currentTail = path.split( '.' ).pop() ?? '';
 *     //     const diverged = ! currentTail.toLowerCase().startsWith( searchQuery.toLowerCase() );
 *     //
 *     //     if ( diverged ) {
 *     //         setPath( '' );
 *     //     }
 *     // };
 *
 *     // const handleQueryDiverged = ( searchQuery: string ) => {
 *     //     if ( ! path ) {
 *     //         setQuery( searchQuery );
 *     //         return;
 *     //     }
 *     //
 *     //     const rootSegment = path.split( '.' )[ 0 ];
 *     //     const diverged = ! rootSegment.toLowerCase().startsWith( searchQuery.toLowerCase() );
 *     //
 *     //     if ( diverged ) {
 *     //         setPath( '' );
 *     //     }
 *     //
 *     //     setQuery( searchQuery );
 *     // };
 *
 *     // const handleNoMatch = ( searchQuery: string ) => {
 *     //     const isSingleSegment = path && path.split( '.' ).length === 1;
 *     //
 *     //     if ( isSingleSegment ) {
 *     //         setPath( '' );
 *     //     }
 *     //
 *     //     setQuery( searchQuery );
 *     // };
 *
 *
 *     const handleExactMatch = ( searchQuery: string, paths: string[] ) => {
 *
 *         // const match = findExactPath( paths, searchQuery );
 *         //
 *         // if ( ! match ) return false;
 *         //
 *         // setPath( match );
 *         // setQuery( searchQuery );
 *         // return true;
 *
 *         const candidate = path
 *             ? buildCandidatePath( path, searchQuery )
 *             : searchQuery;
 *
 *         const match = findExactPath( paths, candidate );
 *         if ( ! match ) return false;
 *
 *         const lastSegment = match.split( '.' ).pop() ?? match;
 *         setPath( match );
 *         setQuery( lastSegment );
 *         return true;
 *     };
 *
 *     const handleDotCommit = ( base: string, paths: string[] ) => {
 *         const currentTail = path?.split( '.' ).pop() ?? '';
 *
 *         if ( currentTail.toLowerCase() === base.toLowerCase() ) {
 *             setQuery( '' );
 *             return;
 *         }
 *
 *         const candidate = buildCandidatePath( path, base );
 *         const match = findExactPath( paths, candidate );
 *
 *         if ( match ) {
 *             setPath( match );
 *             setQuery( '' );
 *         } else {
 *             setQuery( base );
 *         }
 *     };
 *
 *         // const setPathQuery = ( searchQuery: string ) => {
 *     //     // TODO Query this ounce its too expensive
 *     //     const exactMatch = pathIndex.get().find( ( p: string ) => p.toLowerCase() === searchQuery.toLowerCase() );
 *     //
 *     //     if ( exactMatch ) {
 *     //         setPath( exactMatch );
 *     //     }
 *     //
 *     //     // const atLeastOneItem = path.split( '.' ).length === 1;
 *     //     const atLeastOneItem = path && path.split('.').length === 1;
 *     //     if ( atLeastOneItem && ! exactMatch ) {
 *     //         setPath( '' )
 *     //     }
 *     //
 *     //     if ( searchQuery.endsWith( '.' ) ) {
 *     //         const base = searchQuery.slice( 0, -1 );
 *     //
 *     //         const lastSegment = path?.split( '.' ).pop() ?? '';
 *     //
 *     //         if ( lastSegment.toLowerCase() === base.toLowerCase() ) {
 *     //             setQuery( '' );
 *     //             return;
 *     //         }
 *     //
 *     //         // path building has to be a utility used buy all calls to build path using join
 *     //         // maybe a hook that will have path called inside and just pass the last path segment
 *     //         const candidatePath = path ? `${ path }.${ base }` : base;
 *     //
 *     //
 *     //         // TODO We have another call here its too expensive
 *     //         const exactMatch = pathIndex.get().find(
 *     //             ( p: string ) => p.toLowerCase() === candidatePath.toLowerCase()
 *     //         );
 *     //     }
 *     //
 *     //     setQuery( searchQuery );
 *     // };
 */















// const QUERY_KEY    = ( id: string ) => `debug:query:${ id }`;

// const [ query, setQuery ] = useState( '' );
// const [ query, setQueryState ] = useState<string>( () => {
//     return localStorage.getItem( QUERY_KEY( variantId ) ) ?? '';
// } );

// setQueryState( storedQuery );
// const storedQuery   = localStorage.getItem( QUERY_KEY( variantId ) ) ?? '';
// when variantId changes reload from storage

// const setQuery = ( q: string ) => {
//     setQueryState( q );
//
//     localStorage.setItem( QUERY_KEY( variantId ), q );
// };

// ← handles localStorage + event emit
// const handleSetQuery = ( q: string ) => {
//     setQuery( q );
//
//     localStorage.setItem( QUERY_KEY( variantId ), q );
// };

// const [ recentSearches, setRecentSearches ] = useState<string[]>( () => {
//     // persist across sessions
//     // We should have a wrapper around local storage
//     const stored = localStorage.getItem( 'debug:recent-searches' );
//     return stored ? JSON.parse( stored ) : [];
// } );

// const addRecent = ( path: string ) => {
//     setRecentSearches( prev => {
//         const next = [ path, ...prev.filter( p => p !== path ) ].slice( 0, 5 );
//
//         localStorage.setItem( 'debug:recent-searches', JSON.stringify( next ) );
//
//         return next;
//     } );
// };
