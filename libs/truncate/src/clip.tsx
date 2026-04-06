import {
    type PropsWithChildren,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { Box, Popup, Portal } from '@debug-panel/ui';

export const Clip = ( { children }: PropsWithChildren ) => {
    return (
        <Box>
            { children }
        </Box>
    )
}

import { generateUniquePathSegments } from '@debug-panel/path';

import { SegmentList } from './components/segment-list';
import { getPortalElement } from './utils/get-portal-element';

import styles from './styles.module.scss';

export const ClipRow = ( { children, path }: PropsWithChildren<{ path: string }> ) => {
    const containerRef = useRef<HTMLDivElement>( null );
    const [ isOverflowing, setIsOverflowing ] = useState( false );
    const [ showTooltip, setShowTooltip ] = useState( false );

    useLayoutEffect( () => {
        const el = containerRef.current;
        if ( ! el ) return;

        const check = () => {
            setIsOverflowing( el.scrollWidth > el.clientWidth );
        };

        check();

        const ro = new ResizeObserver( check );
        ro.observe( el );
        return () => ro.disconnect();
    }, [] );

    useEffect( () => {
        if ( ! showTooltip ) return;

        const handleScroll = () => setShowTooltip( false );

        window.addEventListener( 'scroll', handleScroll, { passive: true, capture: true } );

        return () => window.removeEventListener( 'scroll', handleScroll, { capture: true } );
    }, [ showTooltip ] );

    return (
        <Box ref={ containerRef } className={ styles.clipRow }>
            { children }
            { isOverflowing && (
                <span
                    data-dots
                    className={ styles.dots }
                    onMouseEnter={ () => setShowTooltip( true ) }
                    onMouseLeave={ () => setShowTooltip( false ) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M14 10.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0"/></svg>

                    { showTooltip && (
                        <Portal container={ getPortalElement() }>
                            <Popup
                                title="Full path"
                                triggerRect={ containerRef.current?.getBoundingClientRect() }
                                onClose={ close }
                            >
                                  <SegmentList
                                      showCount
                                      items={ generateUniquePathSegments( path ) }
                                  />
                            </Popup>
                        </Portal>
                    ) }
                </span>
            ) }
        </Box>
    );
};
