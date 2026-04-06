import { createContext, type PropsWithChildren, RefObject, useMemo, useRef } from 'react';

import { useContext, useState } from '@wordpress/element';

import { usePath } from '@debug-panel/path';
import { createPipeline } from '@debug-panel/pipeline';

import { useRecentSearches } from '../hooks/use-recent-searches';
import { appendRecentSearches } from '../pipelines/append-recent-searches';
import { filterByPath } from '../pipelines/filter-by-path';
import { filterByQuery } from '../pipelines/filter-by-query';
import { groupSuggestions } from '../pipelines/group-suggestions';
import { limitCategories } from '../pipelines/limit-records';
import { getAllPaths } from '../utils/get-all-paths';
import { useSearch } from './search-context';
import { useToolbar } from '@debug-panel/toolbar';
import { filterByValue } from '../pipelines/filter-by-value';

type ContextValue = {
    isOpen: boolean;
    pin: boolean;
    togglePin: () => void;
    open: () => void;
    close: () => void;
    suggestions: any[];
    dataRef: RefObject<unknown>
}

const SuggestionsContext = createContext<ContextValue | null>( null );

export const SuggestionsProvider = ( { children, data }: PropsWithChildren<{ data: unknown }> ) => {
    const [ isOpen, setIsOpen ] = useState( false );
    const [ pin, setPin ] = useState( false );
    const { path } = usePath();
    const { query } = useSearch();
    const { recentSearches } = useRecentSearches()
    const { isValueSearchActive } = useToolbar();
    const dataRef = useRef<unknown>( null );

    dataRef.current = data;

    const suggestions = useMemo( () => {
        if ( isValueSearchActive ) {
            const runValueSearch = createPipeline<unknown>()
                .pipe( data => filterByValue( data, query ) )
                .pipe( data => groupSuggestions( data, path ) )
                .pipe( data => limitCategories( data ) )
                .build();

            return runValueSearch( data );
        }

        const runSearch = createPipeline<string[]>()
            .pipe( data => filterByPath( data, path ) )
            .pipe( data => filterByQuery( data, query ) )
            .pipe( data => groupSuggestions( data, path ) )
            .pipe( data => limitCategories( data ) )
            .pipe( data => appendRecentSearches( data, recentSearches, query ) )
            .build();

        return runSearch( getAllPaths() );

    }, [ path, query, isOpen, isValueSearchActive, data ] );

    // const suggestions = useMemo( () => {
    //     const runSearch = createPipeline<string[]>()
    //         .pipe( data => {
    //             return filterByPath( data, path );
    //         } )
    //         .pipe( data => filterByQuery( data, query ) )
    //         .pipe( data => groupSuggestions( data, path ) )
    //         .pipe( data => limitCategories( data ) )
    //         .pipe( data => appendRecentSearches( data, recentSearches, query ) )
    //         .build();
    //
    //     return runSearch( getAllPaths() );
    //
    // }, [ path, query, isOpen ] );

    return (
        <SuggestionsContext.Provider
            value={ {
                isOpen,
                open: () => setIsOpen( true ),
                close: () => setIsOpen( false ),
                suggestions,
                pin,
                dataRef,
                togglePin: () => {
                    if ( pin ) {
                        setPin( false );
                        close();
                    }

                    if ( ! pin ) {
                        setPin( true );
                    }
                },
            } }
        >
            { children }
        </SuggestionsContext.Provider>
    )
}

export const useSuggestions = () => {
    const context = useContext( SuggestionsContext );

    if ( ! context ) {
        throw new Error( 'useSuggestion must be used within SuggestionProvider' );
    }

    return context;
}
