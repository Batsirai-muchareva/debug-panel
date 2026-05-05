import React, { type ComponentType, Fragment, useEffect } from 'react';

import { PinIcon } from '@debug-panel/icons';
import { usePath } from '@debug-panel/path';
import { ClipRow } from '@debug-panel/truncate';
import { Box, Button, cx, Text } from '@debug-panel/ui';

// TODO fix this dependency cycle with toolbar
import { useToolbar } from '../../../../context/toolbar-context';
import { useSearch } from '../../context/search-context';
import { useSuggestions } from '../../context/suggestions-context';
import { useRecentSearches } from "../../hooks/use-recent-searches";
import { useSuggestionResizable } from '../../hooks/use-suggestions-resizable';
import { Content } from './content';
import { EmptyState } from './empty-state';
import { KeyIcon } from './icons/key-icon';
import { PathIcon } from './icons/path-icon';
import { RecentIcon } from './icons/recent-icon';

import styles from './suggestions.module.scss';

const icons: Record<string, ComponentType> = {
    path: PathIcon,
    key: KeyIcon,
    recent: RecentIcon,
};

export const Suggestions = () => {
    const { suggestions, isOpen, togglePin, pin: pinSuggestions, close } = useSuggestions();
    const { height, onMouseDown } = useSuggestionResizable();
    const { setPath } = usePath();
    const { query, setQuery } = useSearch();
    const { addRecentSearches } = useRecentSearches()
    const { isValueSearchActive } = useToolbar();

    useEffect( () => {
        document.querySelector( 'monaco-editor' )?.addEventListener( 'click', () => {
            close();
        } )
    }, [] )

    if ( ! isOpen ) {
        return null;
    }

    const hasSuggestions = suggestions.length > 0
    const hasNoSearchedResults = ! hasSuggestions && !! query;

    const handleSetPath = ( path: string ) => {
        setPath( path );
        setQuery( '' );
        addRecentSearches( path )
    };

    const hasNothing = ! hasSuggestions && ! hasNoSearchedResults;

    return (
        <Box style={ hasNothing ? { height: 80 } : { height } } className={ styles.list }>
            <Box className={ styles.wrapper }>
                { hasSuggestions && (
                    <>
                        <Button
                            onMouseDown={ togglePin }
                            className={ cx( styles.pinned, { [styles.pinnedActive]: pinSuggestions } ) }
                        >
                            <PinIcon size={ 18 } />
                        </Button>

                        { suggestions.map( ( category, index ) => {
                            const Icon: ComponentType = icons[ category.type ] ?? ( () => null );

                            return (
                                <Fragment key={ index }>
                                    <Box className={ styles.category }>
                                        <Text>{ category.label }</Text>
                                    </Box>
                                    { category.items.map( ( path, i ) => (
                                        <Button key={ path + 'cat' + i } className={ styles.rowItem } onMouseDown={ () => handleSetPath( path ) }>
                                            <Icon />
                                            <ClipRow path={ path }>
                                                <Content path={ path } />
                                            </ClipRow>
                                        </Button>
                                    ) ) }
                                </Fragment>
                            )
                        } ) }
                    </>
                ) }

                { hasNoSearchedResults && <EmptyState /> }
                { ! hasSuggestions && ! hasNoSearchedResults && (
                    <Text className={styles.noSuggestions}>
                        { isValueSearchActive
                            ? 'Start Searching Value...'
                            : 'No suggestions to show'
                        }
                    </Text>
                ) }
            </Box>
            <Box className={styles.resizeHandle} onMouseDown={onMouseDown} />
        </Box>
    )
}
