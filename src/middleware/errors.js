const { HttpResponse } = require("../helpers/http/HttpResponse");

const invalidRoute = (req, res, next) => {
  const response = HttpResponse(res);
  const error = Error(`Not Found - ${req.originalUrl}`);
  response.notFound(error.message);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const response = HttpResponse(res);
  response.serviceUnavailable(err.message);
};

module.exports = {
  invalidRoute,
  errorHandler,
};
