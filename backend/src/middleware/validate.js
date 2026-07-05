/**
 * --------------------------------------------------------
 * Validation Middleware
 * --------------------------------------------------------
 * Processes validation results from express-validator.
 * --------------------------------------------------------
 */

const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const { sendError } = require("../utils/response");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendError(
      res,
      "Validation failed.",
      errors.array(),
      StatusCodes.BAD_REQUEST
    );
  }

  return next();
};

module.exports = validate;