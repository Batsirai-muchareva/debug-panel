import { eventBus } from "@libs/events";
export { Notification } from './notification'

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface INotification {
    id: string;
    message: string;
    type: NotificationType;
}

const HIDE_TIMEOUT = 3000;

export const showNotification = (
    message: string,
    type: NotificationType = 'success'
) => {
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
