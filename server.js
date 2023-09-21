OpenTelemerty;
Importaciones;
const express = require("express");
const { Collector, MeterProvider } = require("@opentelemetry/node");

const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

const MONGO_DB_USR = process.env.MONGO_DB_USR;
const MONGO_DB_PWD = process.env.MONGO_DB_PWD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const mongoURI = `mongodb+srv://${MONGO_DB_USR}:${MONGO_DB_PWD}@cluster0.8kikncc.mongodb.net/${MONGO_DB_NAME}`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started @ ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Inicialización de OpenTelemetry
const collector = new Collector();
const meterProvider = new MeterProvider(collector);

// Registro de datos de la aplicación
app.use((req, res, next) => {
  const span = meterProvider.createSpan("notes", {
    attributes: {
      client: req.headers["user-agent"],
      ip: req.connection.remoteAddress,
      queryParams: req.query,
      requestBody: req.body,
    },
  });

  next();

  span.end();
});

// Configuración del colector de OpenTelemetry ( Puerto Default de signoz )
collector.setExporter({
  type: "otlp",
  endpoint: "http://localhost:3000/index",
});
