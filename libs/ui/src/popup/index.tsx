import { Box, Text } from '@debug-panel/ui';
import { usePopup } from './hooks/use-popup';

import styles from './popup.module.scss';
import { PropsWithChildren } from 'react';

type Props= PropsWithChildren<{
    triggerRect?: DOMRect;
    onClose: () => void;
    title: string;
}>;

export const Popup = ( { triggerRect, title, onClose, children }: Props ) => {
    const { styles: positionStyles, popupRef, arrowLeft } = usePopup( { onClose, triggerRect } );

    return (
        <Box
            ref={ popupRef }
            className={ styles.popup }
            style={ positionStyles }
        >
            <Box
                className={ styles.arrow }
                style={ { left: arrowLeft, right: 'unset' } }
            />
            <Text className={ styles.title }>
                { title }
            </Text>
            { children }
        </Box>
    );
}
