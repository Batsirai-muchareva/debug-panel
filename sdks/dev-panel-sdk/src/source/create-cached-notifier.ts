import type { Notify, Payload } from '@debug-panel/providers';

export const createCachedNotifier = <T = Payload>() => {
    let cache: T | null = null;
    let pendingNotify: Notify<T> | null = null;

    const emit: Notify<T> = ( value ) => {
        if ( cache !== null ) {
            cache = value;
        }

        pendingNotify?.( value );
    };

    const connect = ( notify: Notify<T> ) => {
        pendingNotify = notify;

        if ( cache !== null ) {
            notify( cache );
        }
    };

    const disconnect = () => {
        pendingNotify = null;
    };

    const prefetch: Notify<T> = ( value ) => {
        cache = value;
    };

    return { emit, prefetch, connect, disconnect };
};
