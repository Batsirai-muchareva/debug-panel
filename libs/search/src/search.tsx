import { PathCrumb } from './components/path-crumb';
// import { RecentSearch } from './components/recent-search';
import { SearchBar } from './components/search-bar';
import { Suggestions } from './components/suggestions';
import { SearchProvider } from './context/search-context';
import { SuggestionsProvider } from './context/suggestions-context';

export const Search = ( { onClose, data }: { onClose: () => void; data: unknown } ) => {
    return (
        <SearchProvider>
            <SuggestionsProvider data={ data } >
                <SearchBar onClose={ onClose } />
                <PathCrumb />
                <Suggestions />
            </SuggestionsProvider>
        </SearchProvider>
    )
}

// initial = query ( pending ( **match ) ) && path ( null ) ==== data ( full )
// initial = query ( match ) && path ( query ) ==== data ( path = data ( partial ) )
// query && path ( string )

// map all senarios
