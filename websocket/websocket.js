const WebSocket = require('ws');
const console = require('tracer').colorConsole(); // 增强console

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 4000
});

wss.on('connection', function (ws) {
    console.debug(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.debug(`[SERCER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.error(`[SERVER] error: ${err}`);
            }
        });
    });
});

console.debug('websocket listening 4000...');