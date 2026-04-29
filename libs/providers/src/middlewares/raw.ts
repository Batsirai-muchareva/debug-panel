import type { MiddlewareFactory, Payload } from '../types';

export const raw: MiddlewareFactory< unknown, Payload > = () => {
    return {
        transform: ( value: unknown, next ) => {
            next( {
                data: value,
                meta: {
                    type: 'raw',
                    timestamp: Date.now(),
                },
            } );
        }
    };
}
