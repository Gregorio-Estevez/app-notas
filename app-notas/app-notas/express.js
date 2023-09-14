import express from "express";

const app = express();

app.use((req, res, next) => {
  const clientInfo = req.header["user-agent"]

  const ip = req.ip;

  const queryParams = req.query;

  const requestBody = req.body;

  const log = {
    client: clientInfo,
    ip: ip,
    queryParams: queryParams,
    requestBody: requestBody,
  };

  console.log(log);

  next();
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});