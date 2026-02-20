import { RefObject } from "@wordpress/element";
import { useCallback, useEffect } from "react";
import { findLineElement } from "@libs/json-diffs";

export const useScrollToLine = (
    containerRef: RefObject<HTMLDivElement>,
    lineNumber?: number
) => {
    const scrollToLine = useCallback( ( targetLine: number ) => {
        const container = containerRef.current;

        if ( ! container ) {
            return;
        }

        const targetEl = findLineElement( container, targetLine );

        if ( ! targetEl ) {
            return;
        }

        const doScroll = () => {
            targetEl.scrollIntoView( {
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            } )
        }

        requestAnimationFrame( doScroll )
    }, [ containerRef ] )

    useEffect( () => {
        if ( lineNumber && lineNumber > 0 ) {
            scrollToLine( lineNumber )
        }
    }, [ lineNumber,  scrollToLine ] );

    return { scrollToLine }
}
