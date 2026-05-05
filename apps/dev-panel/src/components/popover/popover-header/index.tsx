import type { PropsWithChildren } from 'react';

import { CloseIcon } from '@debug-panel/icons';
import { Box, Button,Divider } from '@debug-panel/ui';

import { usePopover } from '../../../context/popover-context';
import { Draggable } from '../draggable';

import styles from './popover-header.module.scss';

export const PopoverHeader = ( { children }: PropsWithChildren ) => {
    const { close } = usePopover();

    return (
        <>
            <Draggable>
                <Box className={ styles.header }>
                    <Box className={ styles.children }>
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
