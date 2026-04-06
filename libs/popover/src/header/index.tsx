import { type ElementType, Fragment, type PropsWithChildren } from 'react';

import { Box, Divider } from '@debug-panel/ui';

import { CloseButton } from './close-button';

import styles from './header.module.scss';

export const Header = ( { children, enhance: Enhance = Fragment }: PropsWithChildren<{ enhance?: ElementType }> ) => {
    return (
        <>
            <Enhance>
                <Box className={ styles.header }>
                    { children }
                    <CloseButton />
                </Box>
            </Enhance>
            <Divider />
        </>
    );
};
