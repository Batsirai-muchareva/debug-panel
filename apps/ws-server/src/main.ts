import { createClientRegistry } from './client-registry';
import { createHttpServer }      from './http-server';
import { createWsServer }        from './ws-server';

const HTTP_PORT = 9001;
const WS_PORT   = 9002;

const registry   = createClientRegistry( shutdown );
const httpServer = createHttpServer( HTTP_PORT, registry );
const wsServer   = createWsServer( WS_PORT, registry );

function shutdown(): void {
    console.log( '[Main] Shutting down.' );

    httpServer.close();
    wsServer.close();
    process.exit( 0 );
}

// -------------------------------------------------------------------------
// Graceful shutdown on OS signals (systemd / PM2 / Ctrl+C)
// -------------------------------------------------------------------------

process.on( 'SIGTERM', shutdown );
process.on( 'SIGINT',  shutdown );
