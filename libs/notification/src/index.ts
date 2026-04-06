import type { INotification } from './types';

export { Notification } from './notification';

import { eventBus } from '@debug-panel/events';

const HIDE_TIMEOUT = 3000;

type Args = {
    message: string;
    type?: INotification['type'];
};

export const showNotification = ( {
    message,
    type = 'success',
}: Args ) => {
    const id = generateId();
    const notification: INotification = { id, message, type };

    eventBus.emit( 'notification:show', { ...notification } );

    setTimeout( () => hideNotification( id ) , HIDE_TIMEOUT );
}

const hideNotification = ( id: string ) => {
    eventBus.emit( 'notification:hide', { id } )
}

const generateId = ( prefix = 'notification' ) => {
    return `${ prefix }-${Date.now()}-${Math.random()}`;
}
