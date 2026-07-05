/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * loginValidation.js
 *
 * Description:
 * Frontend Login Validation
 *
 * Must remain synchronized with:
 * backend/src/validators/authValidator.js
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
|--------------------------------------------------------------------------
| Login Validation
|--------------------------------------------------------------------------
*/

const validateLogin = (
  formData
) => {

  const errors = {};

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
  | Password
  |--------------------------------------------------------------------------
  */

  const password =
    formData.password;

  if (!password) {

    errors.password =
      "Password is required.";

  } else if (
    password.length < 6
  ) {

    errors.password =
      "Password must be at least 6 characters.";

  }

  /*
  |--------------------------------------------------------------------------
  | Return Errors
  |--------------------------------------------------------------------------
  */

  return errors;

};

export default validateLogin;