import { eventBus } from '@debug-panel/events';
import { PinIcon } from '@debug-panel/icons';
import { store } from '@debug-panel/storage';
import { Button, cx } from '@debug-panel/ui';

import styles from './pin-popover.module.scss';
import { useState } from 'react';

export const PinPopover = () => {
    const [ isPinned, setIsPinned ] = useState<boolean>( store.getPopoverPin() as boolean );

    const pinPopover = () => {
        store.togglePopoverPin();

        eventBus.emit( 'pin-popover:update' );

        setIsPinned( store.getPopoverPin() as boolean )
    };

    return (
        <Button onClick={ pinPopover } className={ cx( styles.btn, { [styles.active]: isPinned } ) }>
            <PinIcon size={ 15 }/>
        </Button>
    )
}
