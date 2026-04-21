import { eventBus, useEventBus } from '@debug-panel/events';

import { useLayoutBounds } from '../context/layout-bounds-context';
import { applyConstraints } from "../utils/apply-constraints";
import { calculateDimensions } from '../utils/calculate-dimensions';
import { type Direction, useResizeState } from './use-resize-state';

export const useResizable = () => {
    const { position, setPosition, size, setSize } = useLayoutBounds();
    const { stateRef, reset } = useResizeState();

    const startResize = ( e: React.MouseEvent, direction: Direction ) => {
        e.preventDefault();

        stateRef.current = {
            isResizing: true,
            direction,
            startSize: { ...size },
            startMousePosition: { x: e.clientX, y: e.clientY },
            startPanelPosition: { ...position },
        };

        eventBus.emit( 'resize:start' );
    };

    const stopResize = () => {
        if ( ! stateRef.current.isResizing ) {
            return;
        }

        reset();

        eventBus.emit( 'resize:end' );
    };

    const handleResize = ( e: { clientX: number; clientY: number } ) => {
        const state = stateRef.current;

        if ( ! state.isResizing || ! state.direction ) {
            return;
        }

        const delta = {
            x: e.clientX - state.startMousePosition.x,
            y: e.clientY - state.startMousePosition.y,
        };

        const dimensions = calculateDimensions( {
            direction: state.direction,
            startSize: state.startSize,
            startPosition: state.startPanelPosition,
            delta,
        } );

        const constrained = applyConstraints( dimensions );

        setSize( { width: constrained.width, height: constrained.height } );

        setPosition( ( prev ) => ( {
            x: constrained.x ?? prev.x,
            y: constrained.y ?? prev.y,
        } ) );

        eventBus.emit( 'resize:move' );
    };

    useEventBus( 'window:mousemove', handleResize )

    useEventBus( 'window:mouseup', stopResize )

    return {
        startResize
    }
}
