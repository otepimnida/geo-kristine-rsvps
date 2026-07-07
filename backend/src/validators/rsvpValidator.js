/**
 * --------------------------------------------------------
 * RSVP Validator
 * --------------------------------------------------------
 * Validates public RSVP submissions.
 * --------------------------------------------------------
 */

const {
  body,
} = require("express-validator");

/*
|--------------------------------------------------------------------------
| RSVP Validation Rules
|--------------------------------------------------------------------------
*/

const rsvpValidator = [

  body("full_name")

    .trim()

    .notEmpty()

    .withMessage(
      "Full name is required."
    )

    .isLength({
      min: 2,
      max: 100,
    })

    .withMessage(
      "Full name must be between 2 and 100 characters."
    ),

  body("email")

    .trim()

    .notEmpty()

    .withMessage(
      "Email address is required."
    )

    .isEmail()

    .withMessage(
      "Please provide a valid email address."
    )

    .normalizeEmail(),

  body("contact_number")

    .trim()

    .notEmpty()

    .withMessage(
      "Contact number is required."
    )

    .matches(/^(\+63|0)9\d{9}$/)

    .withMessage(
      "Please enter a valid Philippine mobile number."
    ),

  body("attendance")

    .not()

    .isEmpty()

    .withMessage(
      "Attendance selection is required."
    )

    .isBoolean()

    .withMessage(
      "Attendance must be true or false."
    ),

  body("message")

    .optional()

    .trim()

    .isLength({
      max: 300,
    })

    .withMessage(
      "Wedding wishes must not exceed 300 characters."
    ),

];

module.exports = {
  rsvpValidator,
};