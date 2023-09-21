const cluster = require("cluster");
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;

const MONGO_DB_USR = process.env.MONGO_DB_USR;
const MONGO_DB_PWD = process.env.MONGO_DB_PWD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const mongoURI = `mongodb+srv://${MONGO_DB_USR}:${MONGO_DB_PWD}@cluster0.8kikncc.mongodb.net/${MONGO_DB_NAME}`;

if (cluster.isMaster) {
  // Create two child processes.
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.use((req, res, next) => {
        const tracer = diag.trace.getTracer("app");

        // Crea un span para la solicitud actual
        const span = tracer.startSpan("http_request");

        // Agrega atributos al span con la información deseada
        span.setAttributes({
          client: req.headers["user-agent"],
          ip: req.ip,
          queryParams: JSON.stringify(req.query),
          requestBody: JSON.stringify(req.body),
        });

        // Finaliza el span cuando la solicitud se complete
        res.on("finish", () => {
          span.end();
        });

        // Continúa con el siguiente middleware/ruta
        next();
      });

      app.listen(port, () => {
        console.log(`Server started @ ${port}.`);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Distribute incoming connections to the child processes.
  app.on("connection", (socket) => {
    cluster.worker.connections.forEach((worker) => {
      worker.send(socket);
    });
  });
} else {
  // This is a worker process.

  // Receive incoming connections from the master process.
  app.on("connection", () => {
    // Handle the connection here.
  });
}
