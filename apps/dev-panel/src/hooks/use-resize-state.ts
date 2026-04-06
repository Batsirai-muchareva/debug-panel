import { useRef } from 'react';

export type Direction = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se';

export type Position = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};

export type Dimensions = {
    position: Position;
    size: Size;
}

type ResizeState = {
    isResizing: boolean;
    direction: Direction | null;
    startSize: Dimensions['size'];
    startMousePosition: Dimensions['position'];
    startPanelPosition: Dimensions['position'];
};

const INITIAL_STATE: ResizeState = {
    isResizing: false,
    direction: null,
    startSize: { width: 0, height: 0 },
    startMousePosition: { x: 0, y: 0 },
    startPanelPosition: { x: 0, y: 0 },
};

export const useResizeState = () => {
    const stateRef = useRef<ResizeState>( { ...INITIAL_STATE } );

    const reset = () => {
        stateRef.current = { ...INITIAL_STATE };
    };

    return { stateRef, reset };
};
