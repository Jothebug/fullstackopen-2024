const logger = require("./logger");

const requestLogger = (request, _, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _, response, next) => {
  const { name, message } = error;

  if (name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (name === "ValidationError") {
    return response.status(400).json({ error: message });
  } else if (
    name === "MongoServerError" &&
    message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
