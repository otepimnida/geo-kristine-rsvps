/**
 * --------------------------------------------------------
 * Response Utility
 * --------------------------------------------------------
 * Standardized API responses.
 * --------------------------------------------------------
 */

const {
  StatusCodes,
} = require("http-status-codes");

/**
 * Success Response
 */
const sendSuccess = (
  res,
  message,
  data = null,
  statusCode = StatusCodes.OK
) => {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    response.data = data;
  }

  return res
    .status(statusCode)
    .json(response);
};

/**
 * Error Response
 */
const sendError = (
  res,
  message,
  errors = null,
  statusCode = StatusCodes.BAD_REQUEST
) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };

  if (errors) {
    response.errors = errors;
  }

  return res
    .status(statusCode)
    .json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};