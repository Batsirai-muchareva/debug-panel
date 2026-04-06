import type { PropsWithChildren } from 'react';

import { Box } from '@debug-panel/ui';

import styles from './overlay.module.scss';

export const Overlay = ( { children }: PropsWithChildren ) => {
    return (
        <>
            { children }
            <Box style={ { height: '100%' } } className={ styles.overlay }></Box>
        </>
    )
}
