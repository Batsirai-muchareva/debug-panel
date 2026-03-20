import { RefObject, useLayoutEffect,useState } from "react";

const FIXED_WIDTH  = 120;  // "PATH" label + clear button
const ARROW_WIDTH  = 14;   // › separator
const BADGE_WIDTH  = 44;   // "+N" badge reserve

export const useOverflow = (
    containerRef: RefObject<HTMLElement>,
    hiddenRef: RefObject<HTMLElement>,
    segmentCount: number
) => {
    const [ maxVisible, setMaxVisible ] = useState<number | null>( null );

    useLayoutEffect( () => {
        if ( ! containerRef.current || ! hiddenRef.current ) return;

        const containerWidth = containerRef.current.offsetWidth;
        const segEls = Array.from(
            hiddenRef.current.querySelectorAll<HTMLElement>( '.seg-measure' )
        );

        let used = FIXED_WIDTH;
        let fits = 0;

        for ( const el of segEls ) {
            used += el.offsetWidth + ARROW_WIDTH;
            if ( used + BADGE_WIDTH < containerWidth ) {
                fits++;
            } else {
                break;
            }
        }

        setMaxVisible( fits >= segEls.length ? null : Math.max( 1, fits ) );
    } );

    return maxVisible;
};
