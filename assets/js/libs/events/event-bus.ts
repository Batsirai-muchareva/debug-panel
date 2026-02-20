import { Unsubscribe } from "@app/types";
import { EventMap } from "@app/events/event-map";

interface EventBusOptions {
    historySize?: number;
    debug?: boolean;
}

export type EventName = keyof EventMap;
export type EventHandler<E extends EventName> = ( payload: EventPayload<E>) => void;

type EventPayload<E extends EventName> = EventMap[E];

interface EventBus {
    on<E extends EventName>( event: E, handler: EventHandler<E>): Unsubscribe;
    once<E extends EventName>(event: E, handler: EventHandler<E>): void;
    emit<E extends EventName>(
        event: E,
        ...args: EventPayload<E> extends void
            ? []
            : [payload: EventPayload<E>]
    ): void;
    off<E extends EventName>(event: E): void;
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

    const log = ( message: string, ...args: unknown[] ) => {
        if ( debug ) {
            console.debug(`[EventBus] ${message}`, ...args);
        }
    };

    const getListeners = <E extends EventName>(event: E): Set<EventHandler<E>> => {
        if ( ! listeners.has( event ) ) {
            listeners.set( event, new Set() );
        }
        return listeners.get( event ) as Set<EventHandler<E>>;
    };

    return {
        on: ( event, handler) => {
            const eventListeners = getListeners( event );
            eventListeners.add( handler as EventHandler<EventName> );

            log( `Subscribed to "${event}" (${eventListeners.size} listeners)` );

            return () => {
                eventListeners.delete( handler as EventHandler<EventName> );
                log(`Unsubscribed from "${event}" (${eventListeners.size} listeners)`);
            }
        },
        once<E extends EventName>( event: E, handler: EventHandler<E> ) {
            const wrappedHandler: EventHandler<E> = ( payload ) => {
                // Remove before calling to prevent re-entry issues
                getListeners( event ).delete( wrappedHandler as EventHandler<EventName> );
                handler(payload);
            };

            getListeners( event ).add( wrappedHandler as EventHandler<EventName> );
            log( `Subscribed once to "${event}"` );
        },
        emit<E extends EventName>(
            event: E,
            ...args: EventPayload<E> extends void
                ? []
                : [payload: EventPayload<E>]
        ) {
            const payload = args[0] as EventPayload<E>;

            log( `Emitting "${event}"`, payload );

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
                    ( handler as EventHandler<E> )(payload);
                } catch (error) {
                    console.error( `[EventBus] Error in handler for "${event}":`, error );
                }
            } );
        },
        off( event ) {
            listeners.delete( event );

            log( `Removed all listeners for "${event}"` );
        },
        offAll() {
            listeners.clear();
            log( 'Removed all listeners' );
        },
    }
}

export const eventBus = createEventBus()
