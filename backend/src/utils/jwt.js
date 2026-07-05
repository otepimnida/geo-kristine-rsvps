/**
 * --------------------------------------------------------
 * JWT Utility
 * --------------------------------------------------------
 * Centralized JWT operations.
 * --------------------------------------------------------
 */

const jwt = require("jsonwebtoken");

/**
 * Validate Environment Configuration
 */
const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is missing in the environment configuration."
    );
  }

  return process.env.JWT_SECRET;
};

/**
 * Generate Token
 */
const generateToken = (payload) => {
  return jwt.sign(
    payload,
    getSecret(),
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

/**
 * Verify Token
 */
const verifyToken = (token) => {
  return jwt.verify(
    token,
    getSecret()
  );
};

/**
 * Decode Token
 *
 * NOTE:
 * Does not verify the signature.
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};