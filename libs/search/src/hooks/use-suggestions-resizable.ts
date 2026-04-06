import { useRef, useState } from 'react';

import { useLayoutBounds } from '@debug-panel/popover';

export const MIN_HEIGHT = 120;
const INITIAL_HEIGHT = 240;
const HEADER_HEIGHT = 150;

export const useSuggestionResizable = ( initialHeight = INITIAL_HEIGHT ) => {
    const [height, setHeight] = useState( initialHeight );
    const { size } = useLayoutBounds();
    const dragRef = useRef<{ startY: number; startHeight: number } | null>( null );
    const availableHeight = size.height - HEADER_HEIGHT;

    const onMouseDown = ( e: React.MouseEvent ) => {
        e.preventDefault();
        dragRef.current = { startY: e.clientY, startHeight: height };

        const onMouseMove = ( e: MouseEvent ) => {
            if ( !dragRef.current ) return;
            const delta = e.clientY - dragRef.current.startY;
            const next = Math.min( availableHeight * 0.75, Math.max( MIN_HEIGHT, dragRef.current.startHeight + delta ) );
            setHeight( next );
        };

        const onMouseUp = () => {
            dragRef.current = null;
            window.removeEventListener( 'mousemove', onMouseMove );
            window.removeEventListener( 'mouseup', onMouseUp );
        };

        window.addEventListener( 'mousemove', onMouseMove );
        window.addEventListener( 'mouseup', onMouseUp );
    };

    return { height, onMouseDown };
};
