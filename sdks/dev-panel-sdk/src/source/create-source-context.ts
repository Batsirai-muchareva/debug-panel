import { eventBus } from '@debug-panel/events';
import type { Unsubscribe } from '@debug-panel/providers';

export type SourceContext = {
    on: typeof eventBus.on;
    interval: ( ms: number, handler: () => void ) => void;
};

type SourceContextHandle = {
    context: SourceContext;
    drain: () => void;
};

export const createSourceContext = (): SourceContextHandle => {
    const eventUnsubs: Unsubscribe[] = [];
    const intervalIds: ReturnType<typeof setInterval>[] = [];

    const context: SourceContext = {
        on( event, handler ) {
            const events = ( Array.isArray( event ) ? event : [ event ] );

            const unsubs = events.map( ev =>
                eventBus.on( ev, handler )
            );

            eventUnsubs.push( ...unsubs );

            return () => {
                unsubs.forEach( u => u() );
            };
        },

        interval( ms, handler ) {
            intervalIds.push( setInterval( handler, ms ) );
        },
    };

    const drain = () => {
        eventUnsubs.forEach( unsub => unsub() );
        eventUnsubs.length = 0;

        intervalIds.forEach( id => clearInterval( id ) );
        intervalIds.length = 0;
    };

    return { context, drain };
};
