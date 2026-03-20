import React from "react";

import { SearchBar } from "./components/search-bar";
import { SearchProvider } from "./context/search-context";
import { SuggestionsProvider } from "./context/suggestion-context";
import { Suggestions } from "./suggestions";

export const Search = ( { isActive }: { isActive: boolean } ) => {
    return (
            <SearchProvider>
                        <SuggestionsProvider>
                <SearchBar />
                <Suggestions />
                                    </SuggestionsProvider>

            </SearchProvider>
    )
}
// function showPath(path) {
//       const row = document.getElementById('pathRow');
//       const crumb = document.getElementById('pathCrumb');
//       if (!path) { row.style.display = 'none'; return; }
//       row.style.display = 'flex';
//       const parts = path.split('.');
//       crumb.innerHTML = parts.map((p,i) =>
//                 `<span style="color:${i===parts.length-1?'#eee':'#5a9a7a'}">${p}</span>${i<parts.length-1?'<span style="color:#2a5050;margin:0 3px">›</span>':''}`
//       ).join('');
//   }
