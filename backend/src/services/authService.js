/**
 * --------------------------------------------------------
 * Authentication Service
 * --------------------------------------------------------
 * Handles administrator authentication.
 * --------------------------------------------------------
 */

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const supabase = require("../config/supabase");

const { generateToken } = require("../utils/jwt");

const AppError = require("../utils/AppError");

const ROLES = require("../constants/roles");
const ACTIVITY_ACTIONS = require("../constants/activityActions");

const {
  logActivity,
} = require("./activityLogService");

/**
 * --------------------------------------------------------
 * Login Administrator
 * --------------------------------------------------------
 */

const login = async ({
  email,
  password,
}) => {
  const normalizedEmail =
    email.trim().toLowerCase();

  /**
   * Find Administrator
   */

  const {
    data: admin,
    error,
  } = await supabase
    .from("admins")
    .select(`
      id,
      username,
      email,
      password,
      role
    `)
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  if (!admin) {
    throw new AppError(
      "Invalid email or password.",
      StatusCodes.UNAUTHORIZED
    );
  }

  /**
   * Verify Password
   */

  const passwordMatch =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!passwordMatch) {
    throw new AppError(
      "Invalid email or password.",
      StatusCodes.UNAUTHORIZED
    );
  }

  /**
   * Generate JWT
   */

  const token = generateToken({
    id: admin.id,
    username: admin.username,
    role: ROLES.ADMIN,
  });

  /**
   * Log Login Activity
   */

  await logActivity({
    adminId: admin.id,
    action: ACTIVITY_ACTIONS.LOGIN,
    description:
      "Administrator logged into the system.",
  });

  /**
   * Return Login Result
   */

  return {
    token,

    admin: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  };
};

/**
 * --------------------------------------------------------
 * Module Exports
 * --------------------------------------------------------
 */

module.exports = {
  login,
};