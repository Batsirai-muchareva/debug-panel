import { PinIcon } from '@debug-panel/icons';
import { Button, cx } from '@debug-panel/ui';

import { usePopover } from '../../context/popover-context';

import styles from './pin-popover.module.scss';

export const PinPopover = () => {
    const { isPinned, togglePinned } = usePopover();

    return (
        <Button onClick={ togglePinned } className={ cx( styles.btn, { [styles.active]: isPinned } ) }>
            <PinIcon size={ 15 }/>
        </Button>
    )
}
