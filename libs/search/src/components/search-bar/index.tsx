import { ArrowIcon, SearchIcon } from '@debug-panel/icons';
import { Box, Button, TextField } from '@debug-panel/ui';

import { useSearch } from '../../context/search-context';
import { useSuggestions } from '../../context/suggestions-context';

import styles from './search-bar.module.scss';

export const SearchBar = ( { onClose }: { onClose: () => void } ) => {
    const { query, setQuery } = useSearch();
    const { open, close, pin: pinSuggestions } = useSuggestions();

    return (
        <Box className={ styles.searchBar }>
            <Button onClick={ onClose } className={ styles.searchBarBack }>
                <ArrowIcon />
            </Button>

            <TextField
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
