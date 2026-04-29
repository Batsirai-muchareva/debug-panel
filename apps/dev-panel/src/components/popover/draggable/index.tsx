import type { PropsWithChildren } from "react"

import { Box, cx } from '@debug-panel/ui';

import { usePopover } from '../../../context/popover-context';
import { useDraggable } from '../../../hooks/use-draggable';

import styles from './draggable.module.scss';

export const Draggable = ( { children }: PropsWithChildren ) => {
    const { startDrag } = useDraggable();
    const { isPinned } = usePopover();

    return <Box onMouseDown={ isPinned ? undefined : startDrag } className={ cx( { [styles.draggable]: ! isPinned } ) }>{ children }</Box>
}
