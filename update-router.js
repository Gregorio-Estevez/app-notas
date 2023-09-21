const Router = require("express").Router();
const { context, trace } = require("@opentelemetry/api");

let id = 0;

Router.get("/:__id", (req, res, next) => {
  // Iniciar una traza para la solicitud GET
  const currentSpan = trace.getSpan(context.active());
  const span = currentSpan.startSpan("GET /:__id");

  // Agregar atributos a la traza, si es necesario
  span.setAttribute("custom_attribute", req.params.__id);

  id = req.params.__id;
  req.id = req.params.__id;
  console.log("in get middleware");

  // Finalizar la traza al finalizar la solicitud
  span.end();

  next();
});

Router.post("/", (req, res, next) => {
  // Iniciar una traza para la solicitud POST
  const currentSpan = trace.getSpan(context.active());
  const span = currentSpan.startSpan("POST /");

  // Agregar atributos a la traza, si es necesario
  span.setAttribute("custom_attribute", id);

  console.log("in post middleware");
  req.id = id;

  // Finalizar la traza al finalizar la solicitud
  span.end();

  next();
});

module.exports = Router;
