import type { Notify, Payload, Variant } from '@debug-panel/providers';

import { createCachedNotifier } from './create-cached-notifier';
import { createSourceContext, type SourceContext } from './create-source-context';

type SourceEffects = {
  setup?: () => void;
  teardown?: () => void;
};

type SourceFxnProps<T> = {
    notify: Notify<T>;
    context: SourceContext;
};

type SourceFn<T> = ( { notify, context }: SourceFxnProps<T> ) => SourceEffects | null;

export type SourceState = 'idle' | 'prefetching' | 'subscribed';

export const createSource = <T>(
  sourceFn: SourceFn<T>
): Variant['source'] => {
    let state: SourceState = 'idle';
    let effects: ReturnType<typeof sourceFn> | null = null;

    const { prefetch, emit, connect, disconnect } = createCachedNotifier<T>();
    const { context, drain } = createSourceContext();

    const assertState = ( expected: SourceState, action: string ) => {
        if ( state !== expected ) {
            console.warn( `[Source] Invalid "${action}" in state "${state}"` );
        }
    };

    return {
        subscribe( notify: Notify<Payload> ) {
            assertState( 'idle', 'subscribe' );

            state = 'subscribed';

            connect( notify as Notify<T> );

            effects = sourceFn( { notify: emit, context } );
            effects?.setup?.();
        },

        unsubscribe() {
            if ( state !== 'subscribed' ) {
                return;
            }

            effects?.teardown?.();
            drain();
            disconnect();

            effects = null;
            state = 'idle';
        },

        prefetch() {
            if ( state !== 'idle' ) {
                return;
            }

            state = 'prefetching';
            effects = sourceFn( { notify: prefetch, context } );

            try {
                effects?.setup?.();
            } finally {
                effects?.teardown?.();
                drain();
                effects = null;
                state = 'idle';
            }
        },
    };
};























// Promise.resolve( effects?.setup?.() ).finally( () => {
//     effects?.teardown?.();
//     drain();
//     effects = null;
//     state   = 'idle';
// } );




















// type CacheUpdator<T> = ( data: T | null ) => void;
// prefetch() {
//     if ( effects ) {
//         return;
//     }
//
//     effects = sourceFn( { notify: updator, context } );
//
//     Promise.resolve( effects?.setup?.() ).finally( () => {
//         effects?.teardown?.();
//         effects = null;
//     } );
// },
// const createCacheUpdator = <T>() => {
//     let cached: T | null | undefined = undefined;
//     let pendingPush: ( ( data: T | null ) => void ) | null = null;
//
//     const updator: CacheUpdator<T> = ( data ) => {
//         if ( ! enabled ) {
//             pendingPush?.( data ); // no cache — passthrough
//             return;
//         }
//
//         cached = data;
//         pendingPush?.( data ); // push if connected, hold if not
//
//         // else: source still busy, cache holds value until subscribe connects
//     };
//
//     const connect = ( push: ( data: T | null ) => void ) => {
//         pendingPush = push;
//
//         if ( cached !== undefined ) {
//             push( cached ); // replay immediately if already warm
//         }
//     };
//
//     const disconnect = () => {
//         pendingPush = null;
//     };
//
//     return { updator, connect, disconnect };
// };


//
// let notify: Notify<T> | null = null;
// let effects: SourceEffects | null = null;
//
// const { updator, connect, disconnect } = createCacheUpdator<T>( withCache );
//
// /** tracks cleanup fns from `on` handlers — inner subscriptions **/
// const cleanups = new Map<string, Unsubscribe | void>();
//
/** tracks all event unsubscribes from the event bus **/
// const eventUnsubscribe: Unsubscribe[] = [];
//
// /** tracks all interval ids **/
// const intervalIds: ReturnType<typeof setInterval>[] = [];
//
// const context: SourceContext = {
//     on( event, handler ) {
//         const unsub = eventBus.on( event, () => {
//             /** cleanup previous inner subscription for this event before re-running **/
//             cleanups.get( event )?.();
//             cleanups.set( event, handler() );
//         } );
//
//         eventUnsubscribe.push( unsub );
//     },
//
//     interval( ms, handler ) {
//         intervalIds.push( setInterval( handler, ms ) );
//     },
// };

// const teardownContext = () => {
//     /** cleanup all inner subscriptions **/
//     cleanups.forEach( ( cleanup ) => cleanup?.() );
//     cleanups.clear();
//
//     /** unsubscribe all event bus listeners **/
//     eventUnsubscribe.forEach( ( unsub ) => unsub() );
//     eventUnsubscribe.length = 0;
//
//     /** clear all intervals **/
//     intervalIds.forEach( ( id ) => clearInterval( id ) );
//     intervalIds.length = 0;
// };
