// const WebSocket = require('ws');
//
// const wss = new WebSocket.Server({ port: 8080 });
//
// console.log('Debug server listening on ws://127.0.0.1:8080');
//
// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(data) {
//         // Broadcast to all connected clients
//         wss.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data.toString());
//             }
//         });
//     });
// });
const http = require('http');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Debug WS listening on ws://127.0.0.1:8080');

wss.on('connection', ws => {
    console.log('✅ Client connected');
});

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/debug') {
        let body = '';

        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            // broadcast to all macOS clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(body);
                }
            });

            res.writeHead(200);
            res.end('OK');
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('HTTP debug endpoint on http://127.0.0.1:3000/debug');
});

// const WebSocket = require('ws');
//
// const wss = new WebSocket.Server({ port: 8080 });
//
// console.log('Debug server listening on ws://127.0.0.1:8080');
//
// wss.on('connection', ws => {
//     console.log('✅ Client connected');
//
//     // 🔥 SEND A TEST MESSAGE IMMEDIATELY
//     ws.send(JSON.stringify({
//         id: crypto.randomUUID(),
//         source: 'NodeServer',
//         time: new Date().toLocaleTimeString(),
//         payload: 'Hello from Node'
//     }));
// });

// Now:
//
// PHP sends → server
//
// Server broadcasts
//
// macOS app receives
//
// UI updates 🎉


// 🧪 Test order (important)
//
// 1️⃣ Start Node debug server
// 2️⃣ Launch macOS app
// 3️⃣ Trigger PHP debug()
