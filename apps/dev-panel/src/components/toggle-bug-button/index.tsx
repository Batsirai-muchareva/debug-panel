import { useEffect, useRef } from 'react';

import { CloseIcon } from '@debug-panel/icons';
import { Button, cx } from '@debug-panel/ui';

import logo from '../../assets/logo.png';
import { useLayoutBounds } from '../../context/layout-bounds-context';
import { usePopover } from '../../context/popover-context';

import styles from './toggle.module.scss';

export const ToggleButton = () => {
    const { close, open, isOpen } = usePopover();
    const { setPosition, size } = useLayoutBounds();
    const buttonRef = useRef<HTMLButtonElement>( null );

    useEffect( () => {
        const node = buttonRef.current;

        if ( ! node ) {
            return;
        }

        setPosition( {
            x: node.offsetLeft - size.width,
            y: node.offsetTop - size.height
        } );

    }, [ isOpen ] );

    if ( isOpen ) {
        return (
            <Button onClick={ close } className={ cx( styles.toggle, styles.toggleOpen ) }>
                <CloseIcon />
            </Button>
        );
    }

    return (
        <Button
            ref={ buttonRef }
            onClick={ open }
            className={ cx( styles.toggle, styles.toggleClosed ) }>
            <img src={logo} alt="Debug Panel" className={ styles.logo } />
        </Button>
    );
};
