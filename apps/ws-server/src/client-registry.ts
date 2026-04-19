import { WebSocket } from 'ws';

const SHUTDOWN_MESSAGE = 'shutdown';

/**
 * Tracks connected WebSocket clients.
 * Shutdown is driven entirely by the client sending a shutdown message.
 */
export function createClientRegistry() {
    const clients = new Set<WebSocket>();

    function add( client: WebSocket ): void {
        clients.add( client );
        console.log( `[Registry] Client connected — total: ${ clients.size }` );

        // client.on( 'message', ( data ) => {
        //     if ( data.toString() === SHUTDOWN_MESSAGE ) {
        //         console.log( '[Registry] Shutdown requested by client.' );
        //         onShutdown();
        //     }
        // } );
    }

    function remove( client: WebSocket ): void {
        clients.delete( client );
        console.log( `[Registry] Client disconnected — total: ${ clients.size }` );
    }

    function broadcast( payload: unknown ): void {
        const message = JSON.stringify( payload );

        clients.forEach( ( client ) => {
            if ( client.readyState === WebSocket.OPEN ) {
                client.send( message );
            }
        } );
    }

    function size(): number {
        return clients.size;
    }

    return { add, remove, broadcast, size };
}

export type ClientRegistry = ReturnType<typeof createClientRegistry>;
