const express = require("express");

const app = express();

const logdoc = async () => {
  app.use((req) => {
    const clientInfo = req.header["user-agent"];

    const ip = req.ip;

    const queryParams = req.query;

    const requestBody = req.body;

    const logdoc = {
      client: clientInfo,
      ip: ip,
      queryParams: queryParams,
      requestBody: requestBody,
    };

    console.log(logdoc);
  });
};

module.exports = logdoc;
