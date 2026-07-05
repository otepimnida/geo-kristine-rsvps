/**
 * --------------------------------------------------------
 * Authentication Middleware
 * --------------------------------------------------------
 * Protects private routes using JWT authentication.
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const { verifyToken } = require("../utils/jwt");
const { sendError } = require("../utils/response");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return sendError(
        res,
        "Access denied. Authorization header is missing.",
        null,
        StatusCodes.UNAUTHORIZED
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return sendError(
        res,
        "Invalid authorization format.",
        null,
        StatusCodes.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return sendError(
        res,
        "Authentication token is missing.",
        null,
        StatusCodes.UNAUTHORIZED
      );
    }

    req.user = verifyToken(token);

    next();
  } catch (error) {
    return sendError(
      res,
      "Invalid or expired authentication token.",
      null,
      StatusCodes.UNAUTHORIZED
    );
  }
};

module.exports = auth;