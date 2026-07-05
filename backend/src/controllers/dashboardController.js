/**
 * --------------------------------------------------------
 * Dashboard Controller
 * --------------------------------------------------------
 * Handles dashboard HTTP requests.
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const asyncHandler = require("../utils/asyncHandler");

const {
  sendSuccess,
} = require("../utils/response");

const dashboardService = require("../services/dashboardService");

/**
 * --------------------------------------------------------
 * Get Dashboard
 * GET /api/dashboard
 * --------------------------------------------------------
 */

const getDashboard = asyncHandler(async (req, res) => {
  const dashboard =
    await dashboardService.getDashboard();

  return sendSuccess(
    res,
    "Dashboard data retrieved successfully.",
    dashboard,
    StatusCodes.OK
  );
});

module.exports = {
  getDashboard,
};