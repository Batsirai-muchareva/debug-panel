import { eventBus } from '@debug-panel/events';
import type { MiddlewareFactory, Payload } from '@debug-panel/providers';
import { store } from '@debug-panel/storage';

export const keys: MiddlewareFactory<Payload> = ()=> {
    let stored: Record<string, unknown> | null = null;

    return {
        subscribe( control ) {
            return eventBus.on( [ 'browser:key:selected', 'browse:key:clear' ], () => control.replay() );
        },

        transform: ( value, next ) => {
            stored = value.data as Record<string, unknown>;

            const selectedKey = store.getBrowseKey();

            if ( selectedKey && stored ) {
                next( {
                    data: stored[selectedKey] ?? null,
                    meta: {
                        type: 'slice',
                        timestamp: Date.now(),
                    },
                } );
            } else {
                next( {
                    data: stored ? Object.keys( stored ) : [],
                    meta: {
                        type: 'keys',
                        timestamp: Date.now(),
                    },
                } );
            }
        }
    };
};
