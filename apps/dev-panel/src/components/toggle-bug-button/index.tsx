import { CloseIcon } from '@debug-panel/icons';
import { usePopover } from '@debug-panel/popover';
import { Button, cx } from '@debug-panel/ui';

import logo from '../../assets/logo2.png';

import styles from './toggle.module.scss';

export const ToggleButton = () => {
    const { close, open, isOpen } = usePopover();

    if ( isOpen ) {
        return (
            <Button onClick={ close } className={ cx( styles.toggle, styles.toggleOpen) }>
                <CloseIcon />
            </Button>
        );
    }
    return (
        <Button
            onClick={ open }
            className={ cx( styles.toggle, styles.toggleClosed ) }>
            <img src={logo} alt="Debug Panel" className={ styles.logo } />
        </Button>
    );
};
