import { EventListeners, MarionetteElement } from "../sync/get-selected-element";

type EventCallback = ( element: MarionetteElement ) => void;

type EventSubscriber = {
    subscribe: ( element: MarionetteElement, callback: EventCallback ) => () => void;
}

export const createElementEventSubscriber = (): EventSubscriber => ( {
    subscribe: ( element: MarionetteElement, callback: EventCallback ) => {
        const handlers: Array< {
            target: EventListeners;
            event: string;
            handler: EventCallback;
        } > = [];

        const registerHandler = ( target: EventListeners, event: string ) => {
            const handler = () => {
                callback( element );
            }

            target.on( event, handler );
            handlers.push( { target, event, handler } );
        };

        registerHandler( element.model, 'change' );
        registerHandler( element.model, 'destroy' );

        registerHandler( element.model.get( 'settings' ), 'change' );

        return () => {
            handlers.forEach( ( { target, event, handler } ) => {
                target.off( event, handler );
            } );

            handlers.length = 0;
        };
    }
} );
