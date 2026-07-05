/**
 * --------------------------------------------------------
 * Authentication Controller
 * --------------------------------------------------------
 * Handles authentication HTTP requests.
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const asyncHandler = require("../utils/asyncHandler");

const {
  sendSuccess,
} = require("../utils/response");

const authService = require("../services/authService");

/**
 * --------------------------------------------------------
 * Login Administrator
 * POST /api/auth/login
 * --------------------------------------------------------
 */
const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return sendSuccess(
    res,
    "Login successful.",
    result,
    StatusCodes.OK
  );
});

/**
 * --------------------------------------------------------
 * Get Current Profile
 * GET /api/auth/profile
 * --------------------------------------------------------
 */
const profile = asyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    "Profile retrieved successfully.",
    {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    },
    StatusCodes.OK
  );
});

/**
 * --------------------------------------------------------
 * Logout
 * POST /api/auth/logout
 * --------------------------------------------------------
 *
 * Since we're using JWT, logout is handled
 * on the client by removing the token.
 *
 * Later, if we implement Refresh Tokens,
 * we'll invalidate them here.
 */
const logout = asyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    "Logout successful.",
    null,
    StatusCodes.OK
  );
});

module.exports = {
  login,
  profile,
  logout,
};