import type { PropsWithChildren } from 'react';

import { CloseIcon } from '@debug-panel/icons';
import { Box, Button,Divider } from '@debug-panel/ui';

import { Draggable } from '../draggable';

import styles from './popover-header.module.scss';

export const PopoverHeader = ( { children }: PropsWithChildren ) => {
    return (
        <>
            <Draggable>
                <Box className={ styles.header }>
                    <Box>
                        { children }
                    </Box>
                    <Button className={ styles.closeBtn } onClick={ close }>
                        <CloseIcon size={ 12 } />
                    </Button>
                </Box>
            </Draggable>
            <Divider />
        </>
    );
};
