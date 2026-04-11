import * as http from 'http';

import type { ClientRegistry } from './client-registry';

/**
 * HTTP server — PHP posts debug payloads here via wp_remote_post().
 * Broadcasts each payload to all connected WebSocket clients.
 */
export function createHttpServer( port: number, registry: ClientRegistry ) {
    function readBody( req: http.IncomingMessage ): Promise<string> {
        return new Promise( ( resolve, reject ) => {
            let body = '';

            req.on( 'data',  ( chunk ) => { body += chunk; } );
            req.on( 'end',   () => resolve( body ) );
            req.on( 'error', reject );
        } );
    }

    function handleLog( body: string, res: http.ServerResponse ): void {
        try {
            const payload = JSON.parse( body );

            registry.broadcast( payload );

            res.writeHead( 200, { 'Content-Type': 'application/json' } );
            res.end( JSON.stringify( { ok: true, clients: registry.size() } ) );
        } catch {
            res.writeHead( 400 );
            res.end();
        }
    }

    function handleRequest( req: http.IncomingMessage, res: http.ServerResponse ): void {
        if ( req.method !== 'POST' || req.url !== '/log' ) {
            res.writeHead( 404 );
            res.end();
            return;
        }

        readBody( req )
            .then( ( body ) => handleLog( body, res ) )
            .catch( () => {
                res.writeHead( 400 );
                res.end();
            } );
    }

    const server = http.createServer( handleRequest );

    server.listen( port, () => {
        console.log( `[HTTP] Listening on port ${ port }` );
    } );

    function close(): void {
        server.close();
    }

    return { close };
}
