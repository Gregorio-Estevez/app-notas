const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector-grpc');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new NodeTracerProvider();
const exporter = new CollectorTraceExporter();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

// Incorpora la instrumentación para Express.js
registerInstrumentations({
  instrumentations: [expressInstrumentation],
});
