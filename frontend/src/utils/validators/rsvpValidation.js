/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * rsvpValidation.js
 *
 * Description:
 * Frontend RSVP Validation
 *
 * Must remain synchronized with:
 * backend/src/validators/rsvpValidator.js
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
|--------------------------------------------------------------------------
| RSVP Validation
|--------------------------------------------------------------------------
*/

const validateRSVP = (
  formData
) => {

  const errors = {};

  /*
  |--------------------------------------------------------------------------
  | Full Name
  |--------------------------------------------------------------------------
  */

  const fullName =
    formData.full_name.trim();

  if (!fullName) {

    errors.full_name =
      "Full name is required.";

  } else if (
    fullName.length < 3
  ) {

    errors.full_name =
      "Full name must be at least 3 characters.";

  } else if (
    fullName.length > 100
  ) {

    errors.full_name =
      "Full name cannot exceed 100 characters.";

  }

  /*
  |--------------------------------------------------------------------------
  | Email
  |--------------------------------------------------------------------------
  */

  const email =
    formData.email.trim();

  if (!email) {

    errors.email =
      "Email address is required.";

  } else if (
    !EMAIL_PATTERN.test(email)
  ) {

    errors.email =
      "Please enter a valid email address.";

  }

  /*
  |--------------------------------------------------------------------------
  | Attendance
  |--------------------------------------------------------------------------
  */

  if (
    typeof formData.attendance !==
    "boolean"
  ) {

    errors.attendance =
      "Please select your attendance.";

  }

  /*
  |--------------------------------------------------------------------------
  | Guest Count
  |--------------------------------------------------------------------------
  */

  if (
    formData.attendance
  ) {

    const guests =
      Number(
        formData.guest_count
      );

    if (
      Number.isNaN(guests)
    ) {

      errors.guest_count =
        "Guest count is required.";

    } else if (
      guests < 1 ||
      guests > 5
    ) {

      errors.guest_count =
        "Guest count must be between 1 and 5.";

    }

  }

  /*
  |--------------------------------------------------------------------------
  | Message
  |--------------------------------------------------------------------------
  */

  if (

    formData.message &&

    formData.message.length >

      300

  ) {

    errors.message =
      "Message cannot exceed 300 characters.";

  }

  /*
  |--------------------------------------------------------------------------
  | Return Errors
  |--------------------------------------------------------------------------
  */

  return errors;

};

export default validateRSVP;