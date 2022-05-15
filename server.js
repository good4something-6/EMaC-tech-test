const express = require("express");
const server = express();

const apiRouter = require("./routes/api");
const { errorHandler } = require("./errorhandling/errorhandler");

server.use(express.json());

server.use("/api", apiRouter);

server.use(errorHandler);

module.exports = server;
