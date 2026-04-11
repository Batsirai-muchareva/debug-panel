// import express from 'express';
//
// const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 3000;
//
// const app = express();
//
// app.get('/', (req, res) => {
//     res.send({ message: 'Hello API' });
// });
//
// app.listen(port, host, () => {
//     console.log(`[ ready ] http://${host}:${port}`);
// });
import * as http from 'http';
import { WebSocket,WebSocketServer } from 'ws';

const HTTP_PORT = 9001; // PHP sends logs here via HTTP
const WS_PORT = 9002;   // React app connects here via WS

const clients = new Set<WebSocket>();

// WebSocket server — React app connects here
const wss = new WebSocketServer( { port: WS_PORT } );

wss.on( 'connection', ( ws ) => {
    console.log( '[WS] Client connected' );
    clients.add( ws );

    ws.on( 'close', () => {
        clients.delete( ws );
        console.log( '[WS] Client disconnected' );
    } );
} );

// HTTP server — PHP posts logs here
const httpServer = http.createServer( ( req, res ) => {
    if ( req.method !== 'POST' || req.url !== '/log' ) {
        res.writeHead( 404 );
        res.end();
        return;
    }

    let body = '';

    req.on( 'data', ( chunk ) => { body += chunk; } );

    req.on( 'end', () => {
        try {
            const payload = JSON.parse( body );

            // Broadcast to all connected React clients
            clients.forEach( ( client ) => {
                if ( client.readyState === WebSocket.OPEN ) {
                    client.send( JSON.stringify( payload ) );
                }
            } );

            res.writeHead( 200, { 'Content-Type': 'application/json' } );
            res.end( JSON.stringify( { ok: true } ) );
        } catch {
            res.writeHead( 400 );
            res.end();
        }
    } );
} );

httpServer.listen( HTTP_PORT, () => {
    console.log( `[HTTP] Listening on port ${ HTTP_PORT }` );
    console.log( `[WS]   Listening on port ${ WS_PORT }` );
} );
