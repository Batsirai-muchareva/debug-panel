import { useRef } from "@wordpress/element";

import { windowAdapter } from "@libs/adapters";
import { eventBus, EventMap,useEventBus } from "@libs/events";
import { editorPointerEvents } from "@libs/utils";

export function useDraggable() {
    const { position, setPosition } = useBounds();

    const dragStateRef = useRef( {
        isDragging: false,
        startPos: { x: 0, y: 0 },
        startPosition: { x: 0, y: 0 }
    } );

    const startDrag = ( e: any ) => {
        e.preventDefault();

        windowAdapter.attachMouseEvents();

        dragStateRef.current = {
            isDragging: true,
            startPos: { x: e.clientX, y: e.clientY },
            startPosition: { x: position.x, y: position.y }
        };

        editorPointerEvents( true );
    };


    const stopDrag = () => {
        dragStateRef.current.isDragging = false;

        editorPointerEvents( false );
    };

    const handleDrag = ( e: EventMap['window:mousemove'] ) => {
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

        eventBus.emit( 'popover:dragging' )
    };

    useEventBus( 'window:mousemove', handleDrag )

    useEventBus( 'window:mouseup', stopDrag )

    return {
        startDrag
    }
}
