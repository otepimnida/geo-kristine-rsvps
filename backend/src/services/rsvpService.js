/**
 * --------------------------------------------------------
 * RSVP Service
 * --------------------------------------------------------
 * Handles RSVP business logic.
 * --------------------------------------------------------
 */

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

const RSVP_COLUMNS = `
id,
full_name,
email,
contact_number,
attendance,
guest_count,
message,
created_at
`;

/*
|--------------------------------------------------------------------------
| Create RSVP (Public)
|--------------------------------------------------------------------------
*/

const createRSVP = async (body) => {
  const payload = {
    full_name: body.full_name.trim(),

    email:
      body.email.trim().toLowerCase(),

    contact_number:
      body.contact_number.trim(),

    attendance:
      body.attendance,

    /*
    |--------------------------------------------------------------------------
    | Guest Counter Removed
    | Keep DB compatibility
    |--------------------------------------------------------------------------
    */

    guest_count: 1,

    message:
      body.message?.trim() || "",
  };

  /*
  |--------------------------------------------------------------------------
  | Prevent Duplicate Email
  |--------------------------------------------------------------------------
  */

  const {
    data: existingRSVP,
    error: existingError,
  } = await supabase
    .from("rsvps")
    .select("id")
    .eq("email", payload.email)
    .maybeSingle();

  if (existingError) {
    throw new AppError(
      existingError.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  if (existingRSVP) {
    throw new AppError(
      "This email has already submitted an RSVP.",
      StatusCodes.CONFLICT
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Insert RSVP
  |--------------------------------------------------------------------------
  */

  const {
    data,
    error,
  } = await supabase
    .from("rsvps")
    .insert(payload)
    .select(RSVP_COLUMNS)
    .single();

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Get All RSVPs
|--------------------------------------------------------------------------
*/

const getAllRSVPs = async () => {
  const {
    data,
    error,
  } = await supabase
    .from("rsvps")
    .select(RSVP_COLUMNS)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Get RSVP By ID
|--------------------------------------------------------------------------
*/

const getRSVPById = async (id) => {
  const {
    data,
    error,
  } = await supabase
    .from("rsvps")
    .select(RSVP_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  if (!data) {
    throw new AppError(
      "RSVP not found.",
      StatusCodes.NOT_FOUND
    );
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update RSVP (Admin)
|--------------------------------------------------------------------------
*/

const updateRSVP = async (
  id,
  body,
  adminId
) => {
  /*
  |--------------------------------------------------------------------------
  | Verify RSVP Exists
  |--------------------------------------------------------------------------
  */

  await getRSVPById(id);

  const email = body.email
    .trim()
    .toLowerCase();

  /*
  |--------------------------------------------------------------------------
  | Prevent Duplicate Email
  |--------------------------------------------------------------------------
  */

  const {
    data: duplicate,
    error: duplicateError,
  } = await supabase
    .from("rsvps")
    .select("id")
    .eq("email", email)
    .neq("id", id)
    .maybeSingle();

  if (duplicateError) {
    throw new AppError(
      duplicateError.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  if (duplicate) {
    throw new AppError(
      "This email is already used by another RSVP.",
      StatusCodes.CONFLICT
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Update Payload
  |--------------------------------------------------------------------------
  */

  const payload = {
    full_name:
      body.full_name.trim(),

    email,

    contact_number:
      body.contact_number.trim(),

    attendance:
      body.attendance,

    /*
    |--------------------------------------------------------------------------
    | Guest Counter Removed
    |--------------------------------------------------------------------------
    */

    guest_count: 1,

    message:
      body.message?.trim() || "",
  };

  /*
  |--------------------------------------------------------------------------
  | Update Database
  |--------------------------------------------------------------------------
  */

  const {
    data,
    error,
  } = await supabase
    .from("rsvps")
    .update(payload)
    .eq("id", id)
    .select(RSVP_COLUMNS)
    .single();

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Activity Log
  |--------------------------------------------------------------------------
  */

  await logActivity({
    adminId,

    action:
      ACTIVITY_ACTIONS.UPDATE_RSVP,

    description:
      `Updated RSVP for ${data.full_name}.`,
  });

  return data;
};

/*
|--------------------------------------------------------------------------
| Delete RSVP (Admin)
|--------------------------------------------------------------------------
*/

const deleteRSVP = async (
  id,
  adminId
) => {
  const rsvp =
    await getRSVPById(id);

  const { error } =
    await supabase
      .from("rsvps")
      .delete()
      .eq("id", id);

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  await logActivity({
    adminId,

    action:
      ACTIVITY_ACTIONS.DELETE_RSVP,

    description:
      `Deleted RSVP for ${rsvp.full_name}.`,
  });

  return true;
};

module.exports = {
  createRSVP,
  getAllRSVPs,
  getRSVPById,
  updateRSVP,
  deleteRSVP,
};