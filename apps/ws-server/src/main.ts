import { WEB_SOCKET_PORT, WS_SERVER_HTTP_PORT } from '@debug-panel/constants';

import { createClientRegistry } from './client-registry';
import { createHttpServer }      from './http-server';
import { createWsServer }        from './ws-server';

const registry   = createClientRegistry();
const httpServer = createHttpServer( WS_SERVER_HTTP_PORT, registry, shutdown );
const wsServer   = createWsServer( WEB_SOCKET_PORT, registry );

function shutdown(): void {
    console.log( '-----------------------------------------------' );
    console.log( '[Main] Shutting down HTTP & WebServer.' );
    console.log( '-----------------------------------------------' );

    httpServer.close();
    wsServer.close();
    process.exit( 0 );
}

process.on( 'SIGTERM', shutdown );
process.on( 'SIGINT',  shutdown );
