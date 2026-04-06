import { eventBus, type EventMap } from '@debug-panel/events';
import type { Notify, Variant } from '@debug-panel/providers';

type SourceEffects = {
  setup?: () => void;
  teardown?: () => void;
};

type Unsubscribe = () => void;

type SourceContext = {
  on: ( event: keyof EventMap, handler: () => Unsubscribe | void ) => void;
  interval: ( ms: number, handler: () => void ) => void;
};

type SourceFn<T> = ( {
  notify,
  context,
}: {
  notify: Notify<T>;
  context: SourceContext;
} ) => SourceEffects | null;

export const createSource = <T>(
  sourceFn: SourceFn<T>,
): Variant<T>['source'] => {

    let notify: Notify<T> | null = null;
    let effects: SourceEffects | null = null;

    // tracks cleanup fns from `on` handlers — inner subscriptions
    const cleanups = new Map<string, Unsubscribe | void>();

    // tracks all event unsubscribes from the event bus
    const eventUnsubscribe: Unsubscribe[] = [];

    // tracks all interval ids
    const intervalIds: ReturnType<typeof setInterval>[] = [];

    const context: SourceContext = {
        on( event, handler ) {
            const unsub = eventBus.on( event, () => {
                // cleanup previous inner subscription for this event before re-running
                cleanups.get( event )?.();
                cleanups.set( event, handler() );
            } );

            eventUnsubscribe.push( unsub );
        },

        interval( ms, handler ) {
            intervalIds.push( setInterval( handler, ms ) );
        },
    };

    const teardownContext = () => {
        // cleanup all inner subscriptions
        cleanups.forEach( ( cleanup ) => cleanup?.() );
        cleanups.clear();

        // unsubscribe all event bus listeners
        eventUnsubscribe.forEach( ( unsub ) => unsub() );
        eventUnsubscribe.length = 0;

        // clear all intervals
        intervalIds.forEach( ( id ) => clearInterval( id ) );
        intervalIds.length = 0;
    };

    return {
        subscribe( notifyFn: Notify<T> ) {
            if ( effects ) {
                return;
            }

            notify = notifyFn;

            effects = sourceFn( {
                notify: ( data: T | null ) => notify?.( data ),
                context,
            } );

            effects?.setup?.();
        },

        unsubscribe() {
            effects?.teardown?.();
            teardownContext();

            effects = null;
            notify = null;
      },
    };
};
