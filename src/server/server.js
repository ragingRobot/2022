const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const PORT = process.env.PORT || 8989;

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/html/index.html`);
});
app.get('/controller', (req, res) => {
  res.sendFile(`${process.cwd()}/html/controller.html`);
});
app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.get('/view', (req, res) => {
  res.sendFile(`${process.cwd()}/html/view.html`);
});

const players = {};

io.on('connection', (socket) => {
  let controller = false;

  const getPlayer = (id) => {
    let player = null;
    players.forEach((p) => {
      if (p.socket === id) {
        player = p;
      }
    });
    return player;
  };
  socket.on('im a controller', (msg) => {
    controller = true;
    socket.join('game');
    players[socket.id] = {
      socket: socket.id,
      room: 'game',
      type: msg.name,
    };
    console.log(msg);
    io.to('game').emit('controller connection', { socketId: socket.id, value: msg, numberOfPlayers: Object.keys(players).length });
  });

  socket.on('im a game view', (msg) => {
    io.emit('view connection', true);
    console.log('a game view connected');
    socket.join('game');
  });

  socket.on('im a bonus view', (msg) => {
    io.emit('view connection', true);
    console.log('a bonus view connected');
    socket.join('bonus');
  });

  socket.on('disconnect', () => {
    if (controller) {
      console.log(Object.keys(players).length);
      delete players[socket.id];
      console.log(Object.keys(players).length);
      io.to('game').emit('controller connection', { socketId: socket.id, value: false, numberOfPlayers: Object.keys(players).length });
      io.to('bonus').emit('controller connection', { socketId: socket.id, value: false, numberOfPlayers: Object.keys(players).length });
      console.log('controller disconnected');
    }
  });

  socket.on('changeRoom', (msg) => {
    // this is called from the view but the players socket is the one that needs to move rooms
    const playerSocket = io.sockets.sockets.get(msg.socketId);
    if (players[msg.socketId] && playerSocket) {
      console.log('changing room');
      playerSocket.leave(players[msg.socketId].room);
      playerSocket.to(players[msg.socketId].room).emit('controller connection', { socketId: msg.socketId, value: false, numberOfPlayers: Object.keys(players).length });
      console.log(`change from room ${players[msg.socketId].room}`);
      playerSocket.join(msg.room);

      playerSocket.to(msg.room).emit('controller connection', {
        socketId: msg.socketId,
        x: msg.x,
        y: msg.y,
        value: {
          name: players[msg.socketId].type,
        },
        numberOfPlayers: Object.keys(players).length,
      });
      players[msg.socketId].room = msg.room;
      console.log(`to room ${players[msg.socketId].room}`);
      // console.log(io.sockets.adapter.rooms);
    }
  });


  socket.on('playerHit', (msg) => {
    // this is called from the view but the players socket is the one that needs to be alerted
    const playerSocket = io.sockets.sockets.get(msg.socketId);
    if (players[msg.socketId] && playerSocket) {
      console.log('player hit');
      playerSocket.emit("hit", {
        socketId: socket.id,
        value: msg,
      });
      // console.log(io.sockets.adapter.rooms);
    }
  });

  socket.on('left', (msg) => {
    const player = players[socket.id];
    if (player) {
      console.log(`left player:${socket.id} room:${player.room}`);
      io.to(player.room).emit('left', {
        socketId: socket.id,
        value: msg,
      });
    }
  });

  socket.on('right', (msg) => {
    const player = players[socket.id];
    if (player) {
      io.to(player.room).emit('right', {
        socketId: socket.id,
        value: msg,
      });
    }
  });

  socket.on('action', (msg) => {
    const player = players[socket.id];
    if (player) {
      io.to(player.room).emit('action', {
        socketId: socket.id,
        value: msg,
      });
    }
  });

  socket.on('jump', (msg) => {
    const player = players[socket.id];
    if (player) {
      io.to(player.room).emit('jump', {
        socketId: socket.id,
        value: msg,
      });
    }
  });

  socket.on('reset', (msg) => {
    const player = players[socket.id];
    if (player) {
      console.log(`reset: ${msg}`);
      io.to(player.room).emit('reset', msg);
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
