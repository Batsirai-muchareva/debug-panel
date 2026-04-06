import { useEffect } from 'react';

import { usePath } from '@debug-panel/path';

import { SEGMENTS_QUERY_SELECTOR } from '../constants';
import type { Segment, SharedArgs } from '../types';
import { findSegmentById } from '../utils/find-segment-by-id';

export const useTruncateEnd = ( { ref, items, setHiddenSegments }: SharedArgs ) => {
    const { path } = usePath();
    // TODO maybe instead of pass we get segments from here
    useEffect( () => {
        const el = ref.current;

        if ( ! el ) {
            return;
        }

        const update = () => {
            const containerRight = el.getBoundingClientRect().right;
            const children = el.querySelectorAll<HTMLElement>( SEGMENTS_QUERY_SELECTOR );
            const hidden: Segment[] = [];

            children.forEach( ( child ) => {
                const isHidden = child.getBoundingClientRect().right > containerRight;

                setHidden( child, isHidden );

                if ( isHidden ) {
                    const item = findSegmentById( items, child.querySelector( 'button' )?.dataset.id )

                    hidden.push( item );
                }
            } );

            setHiddenSegments( hidden );
        };

        update();

        const resizeObserver = new ResizeObserver( update );
        resizeObserver.observe( el );

        return () => resizeObserver.disconnect();
    }, [ items, path ] );
};

const setHidden = ( child: HTMLElement, hidden: boolean ) => {
    child.dataset.hidden = String( hidden );
    child.style.visibility = hidden ? 'hidden' : '';
};
