import { CloseIcon } from '@debug-panel/icons';
import { Button } from '@debug-panel/ui';

import { usePopover } from '../../context/popover-context';

import styles from './close-btn.module.scss';

export const CloseButton = () => {
    const { close } = usePopover();

    return (
        <Button className={ styles.closeBtn } onClick={ close }>
            <CloseIcon size={ 12 } />
        </Button>
    )
}
