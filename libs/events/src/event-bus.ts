import type { EventMap } from "./event-map";

interface EventBusOptions {
    historySize?: number;
    debug?: boolean;
}

type Unsubscribe = () => void;

export type EventName = keyof EventMap;
export type EventHandler<E extends EventName> = ( payload: EventPayload<E> ) => void;

type EventPayload<E extends EventName> = EventMap[E];

interface EventBus {
    on<E extends EventName | EventName[]>( event: E, handler: EventHandler<EventName> ): Unsubscribe;
    once<E extends EventName>( event: E, handler: EventHandler<E> ): void;
    emit<E extends EventName>(
        event: E,
        ...args: EventPayload<E> extends void
            ? []
            : [payload: EventPayload<E>]
    ): void;
    off<E extends EventName>( event: E ): void;
    offAll(): void;
}

const createEventBus = ( options: EventBusOptions = {} ): EventBus => {
    const { historySize = 100, debug = false } = options;

    const listeners = new Map<EventName, Set<EventHandler<EventName>>>();
    const history: Array<{
        event: string;
        payload: unknown;
        timestamp: number
    }> = [];

    const getListeners = <E extends EventName>( event: E ): Set<EventHandler<E>> => {
        if ( ! listeners.has( event ) ) {
            listeners.set( event, new Set() );
        }
        return listeners.get( event ) as Set<EventHandler<E>>;
    };

    return {
        on: ( event, handler ) => {
            const events = Array.isArray( event ) ? event : [ event ];

            const unsubscribers = events.map( ( e ) => {
                const eventListeners = getListeners( e );
                eventListeners.add( handler );
                return () => eventListeners.delete( handler );
            } );

            // single unsubscribe that cleans up all events
            return () => unsubscribers.forEach( ( unsub ) => unsub() );

            // const eventListeners = getListeners( event );
            // eventListeners.add( handler as EventHandler<EventName> );
            //
            // return () => {
            //     eventListeners.delete( handler as EventHandler<EventName> );
            // }
        },
        once<E extends EventName>( event: E, handler: EventHandler<E> ) {
            const wrappedHandler: EventHandler<E> = ( payload ) => {
                // Remove before calling to prevent re-entry issues
                getListeners( event ).delete( wrappedHandler as EventHandler<EventName> );
                handler( payload );
            };

            getListeners( event ).add( wrappedHandler as EventHandler<EventName> );
        },
        emit<E extends EventName>(
            event: E,
            ...args: EventPayload<E> extends void
                ? []
                : [payload: EventPayload<E>]
        ) {
            const payload = args[0] as EventPayload<E>;

            history.push( {
                event,
                payload,
                timestamp: Date.now(),
            } );

            // Trim history if too large
            while ( history.length > historySize ) {
                history.shift();
            }

            // Notify listeners
            const eventListeners = getListeners( event );

            eventListeners.forEach( ( handler ) => {
                try {
                    ( handler as EventHandler<E> )( payload );
                } catch ( error ) {
                    console.error( `[EventBus] Error in handler for "${event}":`, error );
                }
            } );
        },
        off( event ) {
            listeners.delete( event );
        },
        offAll() {
            listeners.clear();
        },
    }
}

export const eventBus = createEventBus()
