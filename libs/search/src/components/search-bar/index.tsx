import { useRef } from 'react';

import { useEventBus } from '@debug-panel/events';
import { ArrowIcon, SearchIcon } from '@debug-panel/icons';
import { Box, Button, TextField } from '@debug-panel/ui';

import { useSearch } from '../../context/search-context';
import { useSuggestions } from '../../context/suggestions-context';

import styles from './search-bar.module.scss';

export const SearchBar = ( { onClose }: { onClose: () => void } ) => {
    const ref = useRef<HTMLInputElement | null>( null );
    const { query, setQuery } = useSearch();
    const { open, close, pin: pinSuggestions } = useSuggestions();

    useEventBus( 'text-field:focus', ( { id } ) => {
        if ( ! ref ) {
            return;
        }

        if ( id === 'search' ) {
            ref.current?.focus()
        }
    } );

    return (
        <Box className={ styles.searchBar }>
            <Button onClick={ onClose } className={ styles.searchBarBack }>
                <ArrowIcon />
            </Button>

            <TextField
                ref={ ref }
                placeholder="Search..."
                value={ query }
                onChange={ setQuery }
                startIcon={ SearchIcon }
                onFocus={ open }
                onBlur={ ! pinSuggestions ? close : undefined }
            />
        </Box>
    )
};
