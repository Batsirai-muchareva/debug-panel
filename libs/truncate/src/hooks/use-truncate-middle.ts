import { useEffect } from 'react';

import { SEGMENTS_QUERY_SELECTOR } from '../constants';
import type { Segment, SharedArgs } from '../types';
import { findSegmentById } from '../utils/find-segment-by-id';

const ELLIPSIS_WIDTH = 40;

export const useTruncateMiddle = ( { ref, items, setHiddenSegments, hiddenSegments }: SharedArgs ) => {

    // effect 1 — measure overflow and collect which segments to hide
    // triggers re-render with new hiddenSegments
    useEffect( () => {
        const el = ref.current;
        if ( ! el ) return;

        const measure = () => {
            const children = getChildren( el );

            showAll( children );

            if ( ! isOverflowing( el, children ) ) {
                setHiddenSegments( [] );
                return;
            }

            hideMiddle( children );
            revealFromEdgesWhileSpaceAllows( el, children );
            setHiddenSegments( collectHidden( children, items ) );
        };

        measure();

        const ro = new ResizeObserver( measure );
        ro.observe( el );
        return () => ro.disconnect();
    }, [ items ] );

    // effect 2 — apply display styles after React re-renders with new hiddenSegments
    // runs after React has committed the new DOM so styles are not wiped
    useEffect( () => {
        const el = ref.current;
        if ( ! el ) return;

        getChildren( el ).forEach( child => {
            const id = child.querySelector( 'button' )?.dataset.id;
            const isHidden = hiddenSegments?.some( s => s.id === id );
            setHidden( child, isHidden as boolean );
        } );
    }, [ hiddenSegments ] );
}

const getChildren = ( el: HTMLElement ) =>
    Array.from( el.querySelectorAll<HTMLElement>( SEGMENTS_QUERY_SELECTOR ) );


const showAll = ( children: HTMLElement[] ) => {
    children.forEach( c => setHidden( c, false ) );
};

const setHidden = ( child: HTMLElement, hidden: boolean ) => {
    child.dataset.hidden = String( hidden );
    child.style.display = hidden ? 'none' : '';
};

const hideMiddle = ( children: HTMLElement[] ) => {
    children.forEach( ( c, i ) => {
        const isEdge = i === 0 || i === children.length - 1;
        setHidden( c, ! isEdge );
    } );
};

const getVisibleWidth = ( children: HTMLElement[] ) =>
    children.reduce( ( acc, c ) => {
        if ( c.dataset.hidden === 'true' ) {
            return acc;
        }
        // use offsetWidth which is layout width, falls back to 0 if not rendered
        return acc + c.offsetWidth;
    }, ELLIPSIS_WIDTH );

const isOverflowing = ( el: HTMLElement, children: HTMLElement[] ) => {
    const containerWidth = el.offsetWidth;
    const totalWidth = children.reduce( ( acc, c ) => acc + c.offsetWidth, 0 );
    return totalWidth > containerWidth;
};

const revealFromEdgesWhileSpaceAllows = ( el: HTMLElement, children: HTMLElement[] ) => {
    const containerWidth = el.offsetWidth;

    let leftPointer = 1;
    let rightPointer = children.length - 2;
    let turn: 'left' | 'right' = 'left';

    while ( leftPointer <= rightPointer ) {
        const candidate = turn === 'right' ? rightPointer : leftPointer;

        setHidden( children[ candidate ], false );

        if ( getVisibleWidth( children ) > containerWidth ) {
            setHidden( children[ candidate ], true );

            break;
        }

        if ( turn === 'right' ) {
            rightPointer--;
        } else {
            leftPointer++;
        }

        turn = turn === 'right' ? 'left' : 'right';
    }
};
const collectHidden = ( children: HTMLElement[], items: Segment[] ): Segment[] => {
    return children
        .filter( c => c.dataset.hidden === 'true' )
        .map( c =>
            findSegmentById( items, c.querySelector( 'button' )?.dataset.id )
        )
        .filter( Boolean ) as Segment[];
}
