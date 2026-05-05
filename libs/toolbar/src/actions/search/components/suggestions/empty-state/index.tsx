import { pathIndex, usePath } from '@debug-panel/path';
import { Box, Text } from '@debug-panel/ui';

import { useSearch } from '../../../context/search-context';

import styles from './empty-state.module.scss';

export const EmptyState = () => {
    const { path, setPath } = usePath();
    const { query } = useSearch();

    const hasPath = !! path;
    const paths = pathIndex.next( path ?? '' );

    const click = ( index: number ) => {
        setPath( path ? path + '.' + paths[index] : paths[index] );
    }

    return (
        <Box className={ styles.emptyState }>
             <div className={ styles.iconring }>
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2d6a4a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </div>

            <Text className={ styles.title }>
                No matches for <em className={ styles.query }>"{ query }"</em>
            </Text>

            { hasPath && (
                <>
                    <Text className={ styles.subtitle }>
                        Search is scoped to the active path
                    </Text>

                    <div className={ styles.iconringScope } id="scopeBlock">
                        <span className={ styles.iconringTag }>scope</span>
                        <span className={ styles.iconringPath }>{ path }</span>
                    </div>
                </>
            ) }

            { ! hasPath && (
                <div className={ styles.iconringNoPath } id="noPathBlock">
                    No keys matched across the <strong>entire schema</strong>
                </div>
            ) }

            <hr className={ styles.divider } />

            { paths.length > 0 && (
                <>
                    <Text className={ styles.suggestionsLabel }>
                        try a key like
                    </Text>
                    <Box className={ styles.suggestions }>
                        <div className={ styles.iconringChips }>
                            { paths[0] && <button onMouseDown={ () => click( 0 ) } className={ styles.iconringChipTeal }>{ paths[0] }</button> }
                            { paths[1] && <button onMouseDown={ () => click( 1 ) } className={ styles.iconringChipAmber }>{ paths[1] }</button> }
                            { paths[2] && <button onMouseDown={ () => click( 2 ) } className={ styles.iconringChipCoral }> { paths[2] }</button> }
                        </div>
                    </Box>
                </>
            ) }
        </Box>
    );
};
