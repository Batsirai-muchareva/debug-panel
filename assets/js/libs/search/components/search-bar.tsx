import React from "react";
import { useEffect, useRef } from "@wordpress/element";

import { SearchIcon } from "@libs/icons";
import { usePath } from "@libs/path";
import { useToolbarState } from "@libs/toolbar";

import { useSearch } from "../context/search-context";
import { useSuggestions } from "../context/suggestion-context";
import { PathCrumb } from "../path-crumb/path-crumb";
import { ArrowButton } from "./arrow-button";
import { TextField } from "./text-field";

const SEARCH_TEXT = 'Search json path…';
const SEARCH_SEGMENT_TEXT = 'type next segment';

export const SearchBar = () => {
    const blurTimer = useRef<ReturnType<typeof setTimeout> | null>( null );
    const inputRef = useRef<HTMLInputElement>( null );

    const { close: closeSuggestions, open: openSuggestions } = useSuggestions();
    const { query, setQuery, onKeyUp } = useSearch();
    const { setSearchActive } = useToolbarState();
    const { path } = usePath();

    useEffect( () => {
        inputRef.current?.focus();
    }, [] );

    const onFocus = () => {
        if ( blurTimer.current ) {
            clearTimeout( blurTimer.current );
        }

        openSuggestions();
    };

    const onBlur = () => {
        // blurTimer.current = setTimeout( closeSuggestions, 150 );
    };

    const onKeyDown = ( event: React.KeyboardEvent ) => {
        if ( event.key === 'Escape' ) {
            event.preventDefault();
            event.stopPropagation();

            setSearchActive( false );
        }
    }

    return (
        <div style={ { background: '#0a1818', borderBottom: '1px solid #1e3535', flexShrink: 0, } } id="searchBar">
            <div className="search-bar-row">
                <ArrowButton onClick={ () => setSearchActive( false ) } />
                <div className="search-input-wrap">
                    <SearchIcon />
                    <TextField
                        ref={ inputRef }
                        value={ query }
                        onChange={ setQuery }
                        onKeyUp={ onKeyUp }
                        onKeyDown={ onKeyDown }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                        placeholder={ ! path ? SEARCH_TEXT : SEARCH_SEGMENT_TEXT }
                    />
                    <span className="search-count" id="searchCount"></span>
                </div>
            </div>
            <PathCrumb />
        </div>
    );
}













// TODO also handle on press enter to set the path
// TODO backspace as soon it doesnt match go back level one of path

// const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
//     const value = event.target.value;
//     // placeholder={ ! hasAtLeastPath ? "Search json path…" : 'type next segment or backspace'}
//     setQuery( value );
// }

//             <div className="search-nav">
//                 <button className="search-nav-btn" id="prevBtn" disabled>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <polyline points="18 15 12 9 6 15"/>
//                     </svg>
//                 </button>
//                 <button className="search-nav-btn" id="nextBtn" disabled>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <polyline points="6 9 12 15 18 9"/>
//                     </svg>
//                 </button>
//             </div>
{/*<input*/}
{/*    autoComplete="off"*/}
{/*    value={ query }*/}
{/*    onChange={ handleChange }*/}
{/*    ref={ inputRef }*/}
{/*    onFocus={ onFocus }*/}
{/*    onBlur={ onBlur }*/}
{/*    // onKeyDown={ onKeyDown }*/}
{/*    onKeyUp={ onKeyUp }*/}
{/*    className="search-field"*/}
{/*    id="searchField"*/}
{/*    // style={ hasAtLeastPath ? { paddingLeft: '205px'} : {} }*/}
{/*    placeholder={ ! hasAtLeastPath ? "Search json path…" : 'type next segment or backspace'}*/}
{/*/>*/}



{/*{ hasAtLeastPath && (<div className="ph-path hidden" id="phPath">*/}
{/*      <span className="ph-arrow">›</span>*/}
{/*      <span className="ph-hint">type next segment or backspace …</span>*/}
{/*  </div>) }*/}


{/*<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">*/}
{/*    <line x1="19" y1="12" x2="5" y2="12"/>*/}
{/*    <polyline points="12 19 5 12 12 5"/>*/}
{/*</svg>*/}




































































































// if ( e.key === 'Tab' || e.key === 'Enter' ) {
//     e.preventDefault();
//
//     setTimeout( () => {  setQuery( '' ); }, 800)
//
//     eventBus.emit( 'search:commit' );
//     return;
//     // const candidatePath = path ? `${ path }.${ query }` : query;
//     // const exactMatch = pathIndex.get().find(
//     //     ( p: string ) => p.toLowerCase() === candidatePath.toLowerCase()
//     // );
//     //
//     // if ( exactMatch ) {
//     //     setPath( exactMatch );
//     //     setQuery( '' );
//     // }
//     // return;
// }

// if ( e.key === 'ArrowDown' ) {
//     e.preventDefault();
//     setHighlighted( i => Math.min( i + 1, flatItems.length - 1 ) );
//     return;
// }
//
// if ( e.key === 'ArrowUp' ) {
//     e.preventDefault();
//     setHighlighted( i => Math.max( i - 1, 0 ) );
//     return;
// }

// Backspace on empty input — walk path back one segment
// if ( e.key === 'Escape' ) {
//     close(); // your search close fn
//     return;
// }

// const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
//     const val = e.target.value;
//
//     if ( val.endsWith( '.' ) ) {
//         const base = val.slice( 0, -1 );
//
//         if ( ! path ) {
//             const exactMatch = pathIndex.get().find(
//                 ( p: string ) => p.toLowerCase() === base.toLowerCase()
//             );
//
//             if ( exactMatch ) {
//                 setPath( exactMatch );
//             }
//         }
//
//         setQuery( '' );
//         return;
//     }
//
//     setQuery( val );
//
//     if ( ! path ) {
//         const exactMatch = pathIndex.get().find(
//             ( p: string ) => p.toLowerCase() === val.toLowerCase()
//         );
//
//         if ( exactMatch ) {
//             setPath( exactMatch );
//         }
//
//         return;
//     }
//
//     // Don't let an empty query destroy the path —
//     // clearing input should never walk the path back
//     if ( ! val ) {
//         return;
//     }
//
//     const parts = path.split( '.' );
//     const lastSegment = parts[ parts.length - 1 ];
//
//     if ( val.toLowerCase() !== lastSegment.toLowerCase() ) {
//         if ( parts.length <= 1 ) {
//             setPath( '' );
//         } else {
//             setPath( parts.slice( 0, -1 ).join( '.' ) );
//         }
//     }
// };
// const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
//     const val = e.target.value;
//
//     // Dot triggers segment commit (muscle memory fallback)
//     if ( val.endsWith( '.' ) ) {
//         const base = val.slice( 0, -1 );
//         if ( ! base ) return;
//
//         const candidatePath = path ? `${ path }.${ base }` : base;
//         const exactMatch = pathIndex.get().find(
//             ( p: string ) => p.toLowerCase() === candidatePath.toLowerCase()
//         );
//
//         if ( exactMatch ) {
//             setPath( exactMatch );
//             setQuery( '' );
//         } else {
//             // base doesn't match anything — just strip the dot, keep typing
//             setQuery( base );
//         }
//         return;
//     }
//
//     setQuery( val );
// };
// ( event ) => setQuery( event.target.value )
// const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
//     const val = e.target.value;
//     setQuery( val );
//
//     if ( ! path ) return;
//
//     const parts = path.split( '.' );
//     const lastSegment = parts[ parts.length - 1 ];
//
//     // only stays if query exactly matches the last segment
//     if ( val.toLowerCase() !== lastSegment.toLowerCase() ) {
//         if ( parts.length <= 1 ) {
//             setPath( '' );
//         } else {
//             setPath( parts.slice( 0, -1 ).join( '.' ) );
//         }
//     }
// };
// const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
//     const val = e.target.value;
//     setQuery( val );
//
//     if ( ! path ) {
//         // no path set yet — check if query exactly matches a known path
//         const exactMatch = pathIndex.get().find(
//             ( p: string ) => p.toLowerCase() === val.toLowerCase()
//         );
//
//         if ( exactMatch ) {
//             setPath( exactMatch );
//         }
//
//         return;
//     }
//
//     const parts = path.split( '.' );
//     const lastSegment = parts[ parts.length - 1 ];
//
//     if ( val.toLowerCase() !== lastSegment.toLowerCase() ) {
//         if ( parts.length <= 1 ) {
//             setPath( '' );
//         } else {
//             setPath( parts.slice( 0, -1 ).join( '.' ) );
//         }
//     }
// };
// const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
//     const val = e.target.value;
//
//     // User typed a dot — lock in current path segment and clear input
//     if ( val.endsWith( '.' ) ) {
//         const base = val.slice( 0, -1 );
//
//         if ( ! path ) {
//             const exactMatch = pathIndex.get().find(
//                 ( p: string ) => p.toLowerCase() === base.toLowerCase()
//             );
//
//             if ( exactMatch ) {
//                 setPath( exactMatch );
//             }
//         }
//
//         setQuery( '' );
//         return;
//     }
//
//     setQuery( val );
//
//     if ( ! path ) {
//         const exactMatch = pathIndex.get().find(
//             ( p: string ) => p.toLowerCase() === val.toLowerCase()
//         );
//
//         if ( exactMatch ) {
//             setPath( exactMatch );
//         }
//
//         return;
//     }
//
//     const parts = path.split( '.' );
//     const lastSegment = parts[ parts.length - 1 ];
//
//     if ( val.toLowerCase() !== lastSegment.toLowerCase() ) {
//         if ( parts.length <= 1 ) {
//             setPath( '' );
//         } else {
//             setPath( parts.slice( 0, -1 ).join( '.' ) );
//         }
//     }
// };
// if ( e.key !== 'Backspace' ) return;
//
// const nextQuery = query.slice( 0, -1 ); // what query will be after backspace
//
// if ( ! path ) return;
//
// const parts = path.split( '.' );
// const lastSegment = parts[ parts.length - 1 ];
//
// // if the query after backspace no longer starts with/matches the last segment
// if ( ! lastSegment.toLowerCase().startsWith( nextQuery.toLowerCase() ) ) {
//     if ( parts.length <= 1 ) {
//         setPath( '' );
//     } else {
//         setPath( parts.slice( 0, -1 ).join( '.' ) );
//     }
// }

// const onKeyDown = ( e: React.KeyboardEvent<HTMLInputElement> ) => {
//     if ( e.key !== 'Backspace' ) return;
//     if ( query !== '' ) return; // only act when input is already empty
//
//     if ( ! path ) return; // nothing to go back to
//
//     const parts = path.split( '.' );
//
//     if ( parts.length <= 1 ) {
//         // already at top level — clear path entirely
//         setPath( '' );
//         return;
//     }
//
//     // go up one level: "settings.title.value" → "settings.title"
//     const parentPath = parts.slice( 0, -1 ).join( '.' );
//     setPath( parentPath );
// };
