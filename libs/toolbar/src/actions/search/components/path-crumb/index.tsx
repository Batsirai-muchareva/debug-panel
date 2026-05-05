import { memo } from 'react';

import { CloseIcon } from '@debug-panel/icons';
import { usePath } from '@debug-panel/path';
import { Box, Button, Text } from '@debug-panel/ui';

import { Path } from './path';

import styles from './path-crumb.module.scss';

export const PathCrumb = memo( () => {
    const { path, setPath } = usePath();

    if ( ! path ) {
        return null;
    }

    return (
        <Box className={ styles.pathCrumb }>
            <Text className={ styles.label }>
                Path
            </Text>
            <Path />
            <Button className={ styles.clear } onClick={ () => setPath( '' ) }>
                <CloseIcon size={ 12 } />
            </Button>
        </Box>
    )
} )
