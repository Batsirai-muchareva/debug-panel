import { type PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';

import { eventBus } from '@debug-panel/events';
import { SolidDownChevron } from '@debug-panel/icons';
import { Box, Button, cx } from '@debug-panel/ui';

import styles from './actions-clip.module.scss';

const attribute = 'data-action';

export const bindActionsClip = {
    [attribute]: true,
};

const SELECTOR = `:scope > [${ attribute }]`;

export const ActionsClip = ( {
    children,
    className,
    moreActive,
    toggleMore
}: PropsWithChildren<{ className: string; moreActive: boolean; toggleMore: ( state: boolean ) => void }> ) => {
    const containerRef = useRef<HTMLDivElement>( null );
    const [ isOverflowing, setIsOverflowing ] = useState( false );
    const moreRef = useRef<HTMLButtonElement>( null );

    useLayoutEffect( () => {
        const el = containerRef.current;

        if ( !el ) {
            return;
        }

        const check = () => {
            const children = el.querySelectorAll<HTMLElement>( SELECTOR );
            children.forEach( ( child ) => setHidden( child, false ) );

            const containerRight = el.getBoundingClientRect().right;
            const moreWidth = moreRef.current?.offsetWidth ?? 0;
            const threshold = containerRight - moreWidth;

            let hasHidden = false;
            const ids: string[] = [];

            children.forEach( ( child ) => {
                const isHidden = child.getBoundingClientRect().right > threshold;

                setHidden( child, isHidden );

                if ( isHidden ) {
                    hasHidden = true;
                    ids.push( child.id );
                }
            } );

            setIsOverflowing( hasHidden );

            eventBus.emit( 'actions:clip:hide', ids )
        };

        check();

        const ro = new ResizeObserver( check );
        ro.observe( el );
        return () => ro.disconnect();
    }, [] );

    return (
        <Box>
            <Box ref={ containerRef } className={ cx( className, styles.container ) }>
                { children }
                { isOverflowing &&
                    <Button onClick={ () => toggleMore( ! moreActive ) } ref={ moreRef } className={ cx(styles.more, {[styles.moreActive]: moreActive}) }>
                        More <SolidDownChevron />
                    </Button> }
            </Box>
        </Box>
    );
};

const setHidden = ( child: HTMLElement, hidden: boolean ) => {
    child.dataset.hidden = String( hidden );
    child.style.visibility = hidden ? 'hidden' : '';
};
