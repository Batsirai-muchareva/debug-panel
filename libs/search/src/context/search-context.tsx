import { createContext, type PropsWithChildren, useContext } from 'react';
import { useState } from 'react';

type ContextValue = {
    query: string;
    setQuery: ( query: string ) => void;
}

const SearchContext = createContext<ContextValue | null>( null );

export const SearchProvider = ( { children }: PropsWithChildren ) => {
    const [ query, setQuery ] = useState<string>( '' );

    return (
        <SearchContext.Provider value={ { query, setQuery } }>
            { children }
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext( SearchContext );

    if ( ! context ) {
        throw new Error( 'useSearch must be within SearchProvider' );
    }

    return context;
}
