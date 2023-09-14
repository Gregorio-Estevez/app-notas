const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3000;
/* const { MONGO_DB_USR, MONGO_DB_PWD, MONGO_DB_HOST, MONGO_DB_PORT } =
  process.env;
const credentials = MONGO_DB_USR ? `${MONGO_DB_USR}:${MONGO_DB_PWD}@` : ""; */

const MONGO_DB_USR = process.env.MONGO_DB_USR;
const MONGO_DB_PWD = process.env.MONGO_DB_PWD;
const MONGO_DB_HOST = process.env.MONGO_DB_HOST;

const mongoURI = `mongodb+srv://${MONGO_DB_USR}:${MONGO_DB_PWD}@${MONGO_DB_HOST}`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, (arg) => {
      console.log(`Server started @ ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


// OpenTelemerty
// // Importaciones
// const express = require("express");
// const { Collector, MeterProvider } = require("@opentelemetry/node");

// // Inicialización de OpenTelemetry
// const collector = new Collector();
// const meterProvider = new MeterProvider(collector);

// // Registro de datos de la aplicación
// app.use((req, res, next) => {
//   const span = meterProvider.createSpan("notes", {
//     attributes: {
//       client: req.headers["user-agent"],
//       ip: req.connection.remoteAddress,
//       queryParams: req.query,
//       requestBody: req.body,
//     },
//   });

//   next();

//   span.end();
// });

// // Configuración del colector de OpenTelemetry (Puse el puerto default de SigNoz)
// collector.setExporter({
//   type: "otlp",
//   endpoint: "http://localhost:9411/v1/traces",
// });

// // Inicio del servidor
// app.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"));
