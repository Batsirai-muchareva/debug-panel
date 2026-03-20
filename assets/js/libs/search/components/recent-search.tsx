import React from "react"

import { usePath } from "@libs/path";
import { store } from "@libs/storage";

import { useSearch } from "../context/search-context";
// , addRecent, recentSearches
export const RecentSearch = () => {
    const { setQuery, setRawQuery } = useSearch();
    const { setPath } = usePath();

    const recentSearches = store.getRecent();

    // TODO how about that key is not available dont show it in recent search only show relevant to the
    // active variant

    // if ( ! recentSearches.length ) {
    //     return (
    //         <div className="suggestions-empty">
    //             No recent searches
    //         </div>
    //     );
    // }

    const onSelect = ( path: string ) => {
        setRawQuery( '' );
        setPath( path );
        // addRecent( path );
    };

    return (
        <>
            <div className="suggestions-section-label">Recent searches</div>
            {
                recentSearches?.map( ( path ) => (
                    <button
                        onMouseDown={ ( e ) => e.preventDefault() } // ← prevents blur
                        key={ path }
                        className="suggestion-item"
                        onClick={ () => onSelect( path ) }
                    >
                        <span className="suggestion-icon icon-recent">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2.5">
                                <polyline points="12 8 12 12 14 14"/>
                                <path d="M3.05 11a9 9 0 1 0 .5-4"/>
                                <polyline points="3 3 3 7 7 7"/>
                            </svg>
                        </span>
                        <span className="suggestion-main">
                        <span className="suggestion-label">{ path }</span>
                        </span>
                    </button>
                ) )
            }
        </>
    )
}
