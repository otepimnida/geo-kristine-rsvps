/**
 * --------------------------------------------------------
 * Global Error Handler
 * --------------------------------------------------------
 */

const {
  StatusCodes,
} = require("http-status-codes");

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  const statusCode =
    err.statusCode ||
    StatusCodes.INTERNAL_SERVER_ERROR;

  const response = {
    success: false,
    message:
      err.message ||
      "Internal Server Error",
    timestamp:
      new Date().toISOString(),
  };

  /**
   * Include additional error details
   */
  if (err.details) {
    response.errors = err.details;
  }

  /**
   * Development Only
   */
  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    response.stack = err.stack;
  }

  return res
    .status(statusCode)
    .json(response);
};

module.exports = errorHandler;