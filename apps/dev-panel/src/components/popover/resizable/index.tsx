import  type { PropsWithChildren } from "react";

import { usePopover } from '../../../context/popover-context';
import { useResizable } from '../../../hooks/use-resizable';
import type { Direction } from '../../../hooks/use-resize-state';
import { ResizeHandle } from './resize-handle';

type HandleConfig = {
    dir: Direction;
};

export const EDGE_HANDLES: HandleConfig[] = [
    { dir: 'n' },
    { dir: 's' },
    { dir: 'e' },
    { dir: 'w' },
];

export const CORNER_HANDLES: HandleConfig[] = [
    { dir: 'nw' },
    { dir: 'ne' },
    { dir: 'sw' },
    { dir: 'se' },
];

export const Resizable = ( { children }: PropsWithChildren ) => {
    const { startResize } = useResizable();
    const { isPinned } = usePopover();

    const edgeHandles = isPinned
        ? EDGE_HANDLES.filter( ( { dir } ) => dir === 'w' )
        : EDGE_HANDLES;

    return (
        <>
            { children }

            { edgeHandles.map( ( { dir } ) => (
                <ResizeHandle
                    key={ dir }
                    variant="edge"
                    direction={ dir }
                    onMouseDown={ ( e ) => startResize( e as unknown as MouseEvent, dir ) }
                />
            ) ) }

            { ! isPinned && CORNER_HANDLES.map( ( { dir } ) => (
                <ResizeHandle
                    key={ dir }
                    variant="corner"
                    direction={ dir }
                    onMouseDown={ ( e ) => startResize( e as unknown as MouseEvent, dir ) }
                />
            ) ) }
        </>
    )
}
