/**
 * --------------------------------------------------------
 * Activity Log Service
 * --------------------------------------------------------
 * Handles administrator activity logging.
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const supabase = require("../config/supabase");
const AppError = require("../utils/AppError");

/**
 * --------------------------------------------------------
 * Log Activity
 * --------------------------------------------------------
 */

const logActivity = async ({
  adminId,
  action,
  description,
}) => {
  const payload = {
    admin_id: adminId,
    action,
    description,
  };

  const { error } = await supabase
    .from("activity_logs")
    .insert(payload);

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return true;
};

/**
 * --------------------------------------------------------
 * Get Recent Activities
 * --------------------------------------------------------
 */

const getRecentActivities = async (
  limit = 10
) => {
  const { data, error } = await supabase
    .from("activity_logs")
    .select(`
      id,
      admin_id,
      action,
      description,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return data;
};

module.exports = {
  logActivity,
  getRecentActivities,
};