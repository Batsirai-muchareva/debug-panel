import { WebSocketServer } from 'ws';

import type { ClientRegistry }  from './client-registry';

/**
 * WebSocket server — React app connects here to receive log payloads
 * and send control messages (e.g. shutdown).
 */
export function createWsServer( port: number, registry: ClientRegistry ) {
    const wss = new WebSocketServer( { port } );

    wss.on( 'connection', ( ws ) => {
        registry.add( ws );

        ws.on( 'close', () => registry.remove( ws ) );

        ws.on( 'error', ( err ) => {
            console.error( '[WS] Client error:', err.message );
            registry.remove( ws );
        } );
    } );

    wss.on( 'error', ( err ) => {
        console.error( '[WS] Server error:', err.message );
    } );

    console.log( `[WS] Listening on port ${ port }` );

    function close(): void {
        wss.close();
    }

    return { close };
}
