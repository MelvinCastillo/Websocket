const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 5124 });

server.on('connection', socket => {
  console.log('Client connected');

  // Broadcast to all connected clients
  socket.on('message', message => {
    console.log(`Received: ${message}`);
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://BV004:5124/wsocket/');