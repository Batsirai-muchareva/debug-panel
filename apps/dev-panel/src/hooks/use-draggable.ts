import { useRef } from "react";

import { eventBus, useEventBus } from "@debug-panel/events";

import { useLayoutBounds } from '../context/layout-bounds-context';

export function useDraggable() {
    const { position, setPosition } = useLayoutBounds();

    const dragStateRef = useRef( {
        isDragging: false,
        startPos: { x: 0, y: 0 },
        startPosition: { x: 0, y: 0 }
    } );

    const startDrag = ( e: any ) => {
        e.preventDefault();

        dragStateRef.current = {
            isDragging: true,
            startPos: { x: e.clientX, y: e.clientY },
            startPosition: { x: position.x, y: position.y }
        };

        eventBus.emit( 'drag:start' )
    };

    const stopDrag = () => {
        dragStateRef.current.isDragging = false;

        eventBus.emit( 'drag:end' )
    };

    const handleDrag = ( e: { clientX: number; clientY: number; } ) => {
        const state = dragStateRef.current;

        if ( ! state.isDragging ) {
            return
        }

        const deltaX = e.clientX - state.startPos.x;
        const deltaY = e.clientY - state.startPos.y;

        setPosition( {
            x: state.startPosition.x + deltaX,
            y: state.startPosition.y + deltaY
        } );

        eventBus.emit( 'drag:move' )
    };

    useEventBus( 'window:mousemove', handleDrag )

    useEventBus( 'window:mouseup', stopDrag )

    return {
        startDrag
    }
}
