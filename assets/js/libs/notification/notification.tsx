import React from "react"
import { useState } from "@wordpress/element";

import { elementorAdapter } from "@libs/adapters";
import { useEventBus } from "@libs/events";

import { INotification } from "./";

export const Notification = () => {
    const [ notifications, setNotifications ] = useState<INotification[]>([]);

    const hideNotification = ( { id }: any ) => {
        setNotifications( prevState =>
            prevState.filter( notification =>
                notification.id !== id
            )
        );
    };

    useEventBus( 'notification:show', ( notification ) => {
        setNotifications( prevState =>
            [ ...prevState, notification as INotification ]
        )
    } );

    useEventBus( 'notification:hide', hideNotification );

    if ( notifications.length === 0 ) {
        return null;
    }

    const top = ( elementorAdapter.toolbarHeight() ?? 30 ) + 10;

    return (
        <div className="toast-container">
            { notifications.map( ( { id, message, type } ) => (
                <div key={ id } className={ `toast toast--${ type }`}>
                    { icons[ type ] }
                    <span className="toast-msg">{ message }</span>
                    <button className="toast-dismiss">
                        ✕
                    </button>
                </div>
            ) ) }
        </div>
    )
}

const icons = {
    success: <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    warning: <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    error:   <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    info:    <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};
