import type { PropsWithChildren } from "react"

import { Box } from '@debug-panel/ui';

import { useDraggable } from '../../hooks/use-draggable';

import styles from './draggable.module.scss';

export const Draggable = ( { children }: PropsWithChildren ) => {
    const { startDrag } = useDraggable();

    return <Box onMouseDown={ startDrag } className={ styles.draggable }>{ children }</Box>
}
