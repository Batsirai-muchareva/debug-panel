import { type CSSProperties, useEffect, useRef, useState } from 'react';

type Coords = {
    top: number;
    left: number;
}

type Args = {
    onClose: () => void;
    triggerRect?: DOMRect;
}

const MARGIN = 8;

export const usePopup = ( { triggerRect, onClose }: Args ) => {
    const popupRef = useRef<HTMLDivElement>( null );
    const [ coords, setCoords ] = useState<Coords>( { top: 0, left: 0 } );
    const [ arrowLeft, setArrowLeft ] = useState( 0 );

    useEffect( () => {
        if ( ! popupRef.current || ! triggerRect ) {
            return;
        }

        const popupWidth = popupRef.current.offsetWidth;
        const centeredLeft = triggerRect.left + triggerRect.width / 2 - popupWidth / 2;
        const maxLeft = window.innerWidth - popupWidth - MARGIN;
        const clampedLeft = Math.max( MARGIN, Math.min( centeredLeft, maxLeft ) );

        // where the trigger center is relative to the popup's left edge
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        const arrowOffset = triggerCenter - clampedLeft;

        setCoords( {
            top: triggerRect.bottom + 10,
            left: clampedLeft,
        } );

        setArrowLeft( arrowOffset );
    }, [] );

    useEffect( () => {
        const handleClick = ( e: MouseEvent ) => {
            if ( popupRef.current && ! popupRef.current.contains( e.target as Node ) ) {
                onClose();
            }
        };
        const timer = setTimeout( () => document.addEventListener( 'mousedown', handleClick ), 0 );
        return () => {
            clearTimeout( timer );
            document.removeEventListener( 'mousedown', handleClick );
        };
    }, [] );

    return {
        styles: { ...coords } as CSSProperties,
        arrowLeft,
        popupRef,
    };
};
