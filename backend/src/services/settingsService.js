/**
 * --------------------------------------------------------
 * Settings Service
 * --------------------------------------------------------
 * Handles administrator settings,
 * wedding information,
 * administrator profile,
 * and password management.
 * --------------------------------------------------------
 */

const bcrypt = require("bcrypt");

const { StatusCodes } = require("http-status-codes");

const supabase = require("../config/supabase");

const AppError = require("../utils/AppError");

const ACTIVITY_ACTIONS = require("../constants/activityActions");

const {
  logActivity,
} = require("./activityLogService");

/*
|--------------------------------------------------------------------------
| Database Columns
|--------------------------------------------------------------------------
*/

const SETTINGS_COLUMNS = `
id,
groom_name,
bride_name,
wedding_date,
venue,
address,
created_at,
updated_at
`;

const ADMIN_COLUMNS = `
id,
username,
email,
password,
role
`;

/*
|--------------------------------------------------------------------------
| Get System Settings
|--------------------------------------------------------------------------
*/

const getSettings = async () => {

  const {

    data,

    error,

  } = await supabase

    .from("system_settings")

    .select(SETTINGS_COLUMNS)

    .limit(1)

    .maybeSingle();

  if (error) {

    throw new AppError(

      error.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  if (!data) {

    throw new AppError(

      "System settings not found.",

      StatusCodes.NOT_FOUND

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Update Wedding Information
|--------------------------------------------------------------------------
*/

const updateWedding = async (
  body,
  adminId
) => {

  /*
  ----------------------------------------
  Retrieve Current Settings
  ----------------------------------------
  */

  const currentSettings =
    await getSettings();

  /*
  ----------------------------------------
  Prepare Payload
  ----------------------------------------
  */

  const payload = {

    groom_name:
      body.groom_name.trim(),

    bride_name:
      body.bride_name.trim(),

    wedding_date:
      body.wedding_date || null,

    venue:
      body.venue?.trim() || "",

    address:
      body.address?.trim() || "",

    updated_at:
      new Date().toISOString(),

  };

  /*
  ----------------------------------------
  Update Database
  ----------------------------------------
  */

  const {

    data,

    error,

  } = await supabase

    .from("system_settings")

    .update(payload)

    .eq(
      "id",
      currentSettings.id
    )

    .select(SETTINGS_COLUMNS)

    .single();

  if (error) {

    throw new AppError(

      error.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  /*
  ----------------------------------------
  Activity Log
  ----------------------------------------
  */

  await logActivity({

    adminId,

    action:
      ACTIVITY_ACTIONS.UPDATE_SETTINGS,

    description:
      "Updated wedding information.",

  });

  /*
  ----------------------------------------
  Return Updated Settings
  ----------------------------------------
  */

  return data;

};

/*
|--------------------------------------------------------------------------
| Get Administrator Profile
|--------------------------------------------------------------------------
*/

const getProfile = async (
  adminId
) => {

  const {

    data,

    error,

  } = await supabase

    .from("admins")

    .select(`
      id,
      username,
      email,
      role
    `)

    .eq("id", adminId)

    .maybeSingle();

  if (error) {

    throw new AppError(

      error.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  if (!data) {

    throw new AppError(

      "Administrator not found.",

      StatusCodes.NOT_FOUND

    );

  }

  return data;

};

/*
|--------------------------------------------------------------------------
| Update Administrator Profile
|--------------------------------------------------------------------------
*/

const updateProfile = async (
  adminId,
  body
) => {

  /*
  ----------------------------------------
  Retrieve Current Administrator
  ----------------------------------------
  */

  const currentAdmin =
    await getProfile(adminId);

  /*
  ----------------------------------------
  Check Duplicate Email
  ----------------------------------------
  */

  const normalizedEmail =
    body.email
      .trim()
      .toLowerCase();

  const {

    data: duplicate,

    error: duplicateError,

  } = await supabase

    .from("admins")

    .select("id")

    .eq(
      "email",
      normalizedEmail
    )

    .neq(
      "id",
      adminId
    )

    .maybeSingle();

  if (duplicateError) {

    throw new AppError(

      duplicateError.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  if (duplicate) {

    throw new AppError(

      "Email address is already in use.",

      StatusCodes.CONFLICT

    );

  }

  /*
  ----------------------------------------
  Prepare Payload
  ----------------------------------------
  */

  const payload = {

    username:
      body.username.trim(),

    email:
      normalizedEmail,

  };

  /*
  ----------------------------------------
  Update Administrator
  ----------------------------------------
  */

  const {

    data,

    error,

  } = await supabase

    .from("admins")

    .update(payload)

    .eq(
      "id",
      currentAdmin.id
    )

    .select(`
      id,
      username,
      email,
      role
    `)

    .single();

  if (error) {

    throw new AppError(

      error.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  /*
  ----------------------------------------
  Activity Log
  ----------------------------------------
  */

  await logActivity({

    adminId,

    action:
      ACTIVITY_ACTIONS.UPDATE_PROFILE,

    description:
      "Updated administrator profile.",

  });

  /*
  ----------------------------------------
  Return Updated Administrator
  ----------------------------------------
  */

  return data;

};

/*
|--------------------------------------------------------------------------
| Change Administrator Password
|--------------------------------------------------------------------------
*/

const changePassword = async (
  adminId,
  body
) => {

  /*
  ----------------------------------------
  Retrieve Administrator
  ----------------------------------------
  */

  const {

    data: admin,

    error,

  } = await supabase

    .from("admins")

    .select(ADMIN_COLUMNS)

    .eq("id", adminId)

    .maybeSingle();

  if (error) {

    throw new AppError(

      error.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  if (!admin) {

    throw new AppError(

      "Administrator not found.",

      StatusCodes.NOT_FOUND

    );

  }

  /*
  ----------------------------------------
  Verify Current Password
  ----------------------------------------
  */

  const passwordMatch =
    await bcrypt.compare(

      body.current_password,

      admin.password

    );

  if (!passwordMatch) {

    throw new AppError(

      "Current password is incorrect.",

      StatusCodes.UNAUTHORIZED

    );

  }

  /*
  ----------------------------------------
  Prevent Password Reuse
  ----------------------------------------
  */

  const samePassword =
    await bcrypt.compare(

      body.new_password,

      admin.password

    );

  if (samePassword) {

    throw new AppError(

      "New password must be different from the current password.",

      StatusCodes.BAD_REQUEST

    );

  }

  /*
  ----------------------------------------
  Hash New Password
  ----------------------------------------
  */

  const hashedPassword =
    await bcrypt.hash(

      body.new_password,

      10

    );

  /*
  ----------------------------------------
  Update Password
  ----------------------------------------
  */

  const {

    error: updateError,

  } = await supabase

    .from("admins")

    .update({

      password: hashedPassword,

    })

    .eq(

      "id",

      adminId

    );

  if (updateError) {

    throw new AppError(

      updateError.message,

      StatusCodes.INTERNAL_SERVER_ERROR

    );

  }

  /*
  ----------------------------------------
  Activity Log
  ----------------------------------------
  */

  await logActivity({

    adminId,

    action:
      ACTIVITY_ACTIONS.CHANGE_PASSWORD,

    description:
      "Changed administrator password.",

  });

  /*
  ----------------------------------------
  Success
  ----------------------------------------
  */

  return {

    success: true,

    message:
      "Password updated successfully.",

  };

};

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/

module.exports = {

  /*
  ----------------------------------------
  Wedding Information
  ----------------------------------------
  */

  getSettings,

  updateWedding,

  /*
  ----------------------------------------
  Administrator Profile
  ----------------------------------------
  */

  getProfile,

  updateProfile,

  /*
  ----------------------------------------
  Security
  ----------------------------------------
  */

  changePassword,

};