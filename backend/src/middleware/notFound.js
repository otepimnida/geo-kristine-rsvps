/**
 * --------------------------------------------------------
 * 404 Not Found Middleware
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({
      success: false,
      message: "API route not found.",
      timestamp:
        new Date().toISOString(),
    });
};

module.exports = notFound;