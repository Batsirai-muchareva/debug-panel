import { raw } from './middlewares/raw';
import type {
    MiddlewareFactory,
    Notify,
    Payload,
    Provider,
    Transform,
} from './types';

const DEFAULT_MIDDLEWARES = [ raw ];

export const applyMiddleware = ( variant: Provider['variants'][number] ) => {
    const factories: MiddlewareFactory[] = variant.middleware ?? [];
    const ctx = { variantId: variant.id };

    const middlewareDefs = [ ...DEFAULT_MIDDLEWARES, ...factories ].map( fxn => fxn( ctx ) );
    const transforms = middlewareDefs.map( m => m.transform );

    const subscriptions: ( () => void )[] = [];

    const originalSubscribe = variant.source.subscribe.bind( variant.source );
    const originalUnsubscribe = variant.source.unsubscribe.bind( variant.source );

    const cleanup = () => {
        subscriptions.forEach( unsub => unsub() );
        subscriptions.length = 0;
    };

    return {
        ...variant,
        source: {
            ...variant.source,
            subscribe( notify ) {
                cleanup()

                const runner = createPipelineRunner( notify, transforms );

                middlewareDefs.forEach( middleware => {
                    if ( middleware.subscribe ) {
                        const unsub = middleware.subscribe( {
                            replay: runner.replay,
                        } );

                        if ( typeof unsub === 'function' ) {
                            subscriptions.push( unsub );
                        }
                    }
                } );

                originalSubscribe( ( value ) => {
                    runner.push( value );
                } );
            },
            unsubscribe() {
                cleanup()

                originalUnsubscribe();
            },
        },
    };
};

// const compose = ( notify: Notify<Payload>, transforms: Transform[] ) => {
//     return ( value: unknown ) => {
//         let trackIndex = -1;
//
//         const run = ( index: number, val: Payload | unknown ) => {
//             if ( index <= trackIndex ) {
//                 throw new Error( 'next() called multiple times' );
//             }
//
//             trackIndex = index;
//
//             const fn = transforms[index];
//
//             if ( ! fn ) {
//                 return notify( val as Payload );
//             }
//
//             fn( val, ( nextVal ) => run( index + 1, nextVal ) );
//         };
//
//         run( 0, value );
//     };
// };
//
//
// // pipeline-runner.ts
//
// // import type { Notify, Payload,Transform } from './types';

export const createPipelineRunner = (
    notify: Notify<Payload>,
    transforms: Transform[]
) => {
    let lastValue: unknown;

    const run = ( value: unknown ) => {
        let trackIndex = -1;

        const step = ( index: number, val: unknown ) => {
            if ( index <= trackIndex ) {
                throw new Error( 'next() called multiple times' );
            }

            trackIndex = index;

            const fn = transforms[index];

            if ( ! fn ) {
                return notify( val as Payload );
            }

            fn( val, ( nextVal ) => step( index + 1, nextVal ) );
        };

        step( 0, value );
    };

    return {
        push( value: unknown ) {
            lastValue = value;
            run( value );
        },

        replay() {
            if ( lastValue !== undefined ) {
                run( lastValue );
            }
        },
    };
};
