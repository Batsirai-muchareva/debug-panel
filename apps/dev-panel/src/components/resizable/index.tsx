import  type { PropsWithChildren } from "react";

import { useResizable } from '../../hooks/use-resizable';
import type { Direction } from '../../hooks/use-resize-state';
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

    return (
        <>
            { children }

            { EDGE_HANDLES.map( ( { dir } ) => (
                <ResizeHandle
                    key={ dir }
                    variant="edge"
                    direction={ dir }
                    onMouseDown={ ( e ) => startResize( e, dir ) }
                />
            ) ) }

            { CORNER_HANDLES.map( ( { dir } ) => (
                <ResizeHandle
                    key={ dir }
                    variant="corner"
                    direction={ dir }
                    onMouseDown={ ( e ) => startResize( e, dir ) }
                />
            ) ) }
        </>
    )
}
