import React from "react"

import { RecentSearch } from "./components/recent-search";
import { SuggestionsPanel } from "./components/suggestions-panel";
import { useSearch } from "./context/search-context";
import { useSuggestions } from "./context/suggestion-context";

export const Suggestions = () => {
    const { isOpen } = useSuggestions();
    const { query } = useSearch();

    const hasQuery = !! query.trim();

    if ( ! isOpen ) {
        return null;
    }

    return (
        <div className="suggestions-panel open" id="suggestionsPanel">
            <div className="suggestions-inner" id="suggestionsInner">
                { hasQuery
                    ? <SuggestionsPanel/>
                    : <RecentSearch/>
                }

                <div className="status-bar">
                    <span className="sb-hint" id="hint">FULL PATH</span>
                    <span className="sb-path" id="path">—</span>
                </div>
            </div>
        </div>
    )
}
