const cluster = require('cluster');
const app = require("./app");

if (cluster.isMaster) {
    // Create two child processes.
    for (let i = 0; i < 4; i++) {
      cluster.fork();
    }
  
    // Listen for incoming connections.
    app.listen(3000);

    // Distribute incoming connections to the child processes.
    app.on('connection', (socket) => {
      cluster.worker.connections.forEach((worker) => {
        worker.send(socket);
      });
    });
  } else {
    // This is a worker process.
  
    // Receive incoming connections from the master process.
    app.on('connection', (socket) => {
      // Handle the connection here.
    });
  }