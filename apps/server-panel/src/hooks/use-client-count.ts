import { useEffect, useState } from 'react';

import { WS_SERVER_HTTP_PORT } from '@debug-panel/constants';

const STATUS_URL = `http://localhost:${ WS_SERVER_HTTP_PORT }/status`;

/**
 * Polls the ws-server HTTP /status endpoint every `intervalMs` ms and returns
 * the number of currently connected WebSocket clients, or null if unreachable.
 */
export function useClientCount( intervalMs = 5_000 ) {
    const [ count, setCount ] = useState<number | null>( null );

    useEffect( () => {
        let cancelled = false;

        const poll = () => {
            window.fetch( STATUS_URL )
                .then( ( r ) => r.json() )
                .then( ( d: { clients: number } ) => {
                    if ( !cancelled ) setCount( d.clients );
                } )
                .catch( () => {
                    if ( !cancelled ) setCount( null );
                } );
        };

        poll();
        const id = setInterval( poll, intervalMs );

        return () => {
            cancelled = true;
            clearInterval( id );
        };
    }, [ intervalMs ] );

    return count;
}
