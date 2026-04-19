import * as http from 'http';

import type { ClientRegistry } from './client-registry';

/**
 * HTTP server — PHP posts debug payloads here via wp_remote_post().
 * Broadcasts each payload to all connected WebSocket clients.
 */
export function createHttpServer( port: number, registry: ClientRegistry, onShutdown: () => void ) {
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

    const CORS_HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    function handleRequest( req: http.IncomingMessage, res: http.ServerResponse ): void {
        // CORS pre-flight
        if ( req.method === 'OPTIONS' ) {
            res.writeHead( 204, CORS_HEADERS );
            res.end();
            return;
        }

        if ( req.method === 'POST' && req.url === '/shutdown' ) {
            res.writeHead( 200, CORS_HEADERS );
            res.end();
            onShutdown();
            return;
        }

        // Status endpoint — returns connected client count
        if ( req.method === 'GET' && req.url === '/status' ) {
            res.writeHead( 200, { 'Content-Type': 'application/json', ...CORS_HEADERS } );
            res.end( JSON.stringify( { clients: registry.size() } ) );
            return;
        }

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
