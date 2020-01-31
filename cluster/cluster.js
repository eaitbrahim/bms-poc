const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io');
const socketMain = require('./socketMain');
const io_redis = require('socket.io-redis');
const farmhash = require('farmhash');

const keys = require('./config/keys');

const port = keys.clusterPort;
const num_processes = require('os').cpus().length;

if (cluster.isMaster) {
  let workers = [];
  let spawn = function(i) {
    workers[i] = cluster.fork();
    workers[i].on('exit', function(code, signal) {
      spawn(i);
    });
  };

  for (var i = 0; i < num_processes; i++) {
    spawn(i);
  }

  const worker_index = function(ip, len) {
    return farmhash.fingerprint32(ip) % len;
  };

  const server = net.createServer(
    {
      pauseOnConnect: true
    },
    connection => {
      let worker =
        workers[worker_index(connection.remoteAddress, num_processes)];
      worker.send('sticky-session:connection', connection);
    }
  );

  server.listen(port);
  console.log(`Master listening on port ${port}`);
} else {
  let app = express();
  // Don't expose our internal server to the outside world.
  const server = app.listen(0, 'localhost');
  const io = socketio(server);

  // Tell Socket.IO to use the redis adapter.
  io.adapter(
    io_redis({
      host: keys.ioRedisHost,
      port: keys.ioRedisPort
    })
  );

  // on connection, send the socket over to our module with socket stuff
  io.on('connection', function(socket) {
    socketMain(io, socket);
    console.log(`connected to worker: ${cluster.worker.id}`);
  });

  // Listen to messages sent from the master. Ignore everything else.
  process.on('message', function(message, connection) {
    if (message !== 'sticky-session:connection') {
      return;
    }

    // Emulate a connection event on the server by emitting the
    // event with the connection the master sent us.
    server.emit('connection', connection);

    connection.resume();
  });
}
