import { useState } from 'react';

import { TOOLBAR_CONTENT_PORTAL_ID } from '@debug-panel/constants';
import { useEventBus } from '@debug-panel/events';
import { type IconName, renderIcon } from '@debug-panel/icons';
import { Box, Button, cx, Portal, Text } from '@debug-panel/ui';

import type { INotification } from '../types';

import styles from './notification.module.scss';

const ICONS_NAME_MAP: Record<string, IconName> = {
    success: 'check',
    warning: 'warning',
    error: 'close',
    info: 'info',
};

export const Notification = () => {
    const [ notifications, setNotifications ] = useState<INotification[]>( [] );

    useEventBus( 'notification:show', ( notification ) => {
        setNotifications( prevState =>
            [ ...prevState, notification as INotification ]
        )
    } );

    useEventBus( 'notification:hide', ( { id } ) => {
        setNotifications( prev =>
            prev.filter( not => not.id !== id )
        );
    } );

    if ( notifications.length === 0 ) {
        return null;
    }

    return (
        <Portal container={ document.getElementById( TOOLBAR_CONTENT_PORTAL_ID ) as HTMLElement }>
            <Box className={ styles.notification }>
                {
                    notifications.map( ( { id, message, type } ) => (
                        <Box key={ id } className={ cx( styles[type], styles.notificationItem ) }>
                            { renderIcon( ICONS_NAME_MAP[type] ) }

                            <Text className={styles.message}>{ message }</Text>
                            <Button className={styles.dismiss}>
                                x
                            </Button>
                        </Box>
                    ) )
                }
            </Box>
        </Portal>
    )
}
