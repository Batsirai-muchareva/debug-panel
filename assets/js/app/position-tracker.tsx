import React from "react";
import { useCallback, useState } from "react";
import { useEffect, useRef } from "@wordpress/element";
import { Fill } from "@wordpress/components";
import { POSITION_TRACKER_SLOT_ID } from "@component/toggle-button/toggle-button";
import { useBounds } from "@app/context/bounds-context";

export const PositionTracker = () => {
    const [ node, setNode ] = useState<HTMLElement>();
    const { size, setPosition } = useBounds();
    const sizeRef = useRef( size );

    const callbackRef = useCallback( ( element: HTMLElement ) => {
        setNode( element.parentElement as HTMLElement );
    }, [] );

    useEffect( () => {
        if ( ! node ) {
            return;
        }

        node?.addEventListener( 'click', updatePosition )

        return () => node?.removeEventListener( 'click', updatePosition );
    }, [ node ] );

    useEffect( () => {
        sizeRef.current = size;
    }, [ size ] );

    const updatePosition = () => {
        requestAnimationFrame( () => {
            if ( ! node ) {
                return;
            }

            const currentSize = sizeRef.current;

            setPosition( {
                x: node.offsetLeft - currentSize.width,
                y: node.offsetTop - currentSize.height
            } );
        } )
    }

    return (
        <Fill name={ POSITION_TRACKER_SLOT_ID }>
            <span ref={ callbackRef } />
        </Fill>
    );
}
