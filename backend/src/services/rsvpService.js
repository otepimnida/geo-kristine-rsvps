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
  | Updated Payload
  |--------------------------------------------------------------------------
  */

  const payload = {

    full_name: body.full_name.trim(),

    email,

    attendance: body.attendance,

    /*
    |--------------------------------------------------------------------------
    | Version 2.0
    |
    | Guest counter removed.
    | Keep database compatibility.
    |--------------------------------------------------------------------------
    */

    guest_count: 1,

    message:
      body.message?.trim() || "",

  };

  /*
  |--------------------------------------------------------------------------
  | Update RSVP
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