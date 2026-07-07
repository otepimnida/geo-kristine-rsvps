/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * rsvpValidation.js
 *
 * Description:
 * RSVP Form Validation
 *
 * Responsibilities:
 * ----------------------------------------------------------
 * - Full Name Validation
 * - Email Validation
 * - Contact Number Validation
 * - Attendance Validation
 * - Personal Message Validation
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

/*
|--------------------------------------------------------------------------
| Philippine Mobile Number
|--------------------------------------------------------------------------
|
| Accepted Formats:
|
| 09171234567
| 09998887777
| +639171234567
|
*/

const PHONE_REGEX =
  /^(\+63|0)9\d{9}$/;

/*
|--------------------------------------------------------------------------
| Email
|--------------------------------------------------------------------------
*/

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
|--------------------------------------------------------------------------
| Validation
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

  if (
    !formData.full_name?.trim()
  ) {
    errors.full_name =
      "Full name is required.";
  } else if (
    formData.full_name
      .trim()
      .length < 2
  ) {
    errors.full_name =
      "Full name must be at least 2 characters.";
  } else if (
    formData.full_name
      .trim()
      .length > 100
  ) {
    errors.full_name =
      "Full name must not exceed 100 characters.";
  }

  /*
  |--------------------------------------------------------------------------
  | Email
  |--------------------------------------------------------------------------
  */

  if (
    !formData.email?.trim()
  ) {
    errors.email =
      "Email address is required.";
  } else if (
    !EMAIL_REGEX.test(
      formData.email.trim()
    )
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  /*
  |--------------------------------------------------------------------------
  | Contact Number
  |--------------------------------------------------------------------------
  */

  if (
    !formData.contact_number?.trim()
  ) {
    errors.contact_number =
      "Contact number is required.";
  } else if (
    !PHONE_REGEX.test(
      formData.contact_number.trim()
    )
  ) {
    errors.contact_number =
      "Please enter a valid Philippine mobile number.";
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
  | Personal Message
  |--------------------------------------------------------------------------
  */

  if (
    formData.message &&
    formData.message.trim().length >
      300
  ) {
    errors.message =
      "Wedding wishes must not exceed 300 characters.";
  }

  return errors;
};

export default validateRSVP;