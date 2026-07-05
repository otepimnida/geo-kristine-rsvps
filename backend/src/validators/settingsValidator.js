/**
 * --------------------------------------------------------
 * Settings Validator
 * --------------------------------------------------------
 * Validates administrator settings requests.
 * --------------------------------------------------------
 */

const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Wedding Information Validation
|--------------------------------------------------------------------------
*/

const updateWeddingValidation = [

  body("groom_name")

    .trim()

    .notEmpty()

    .withMessage("Groom name is required.")

    .isLength({
      min: 2,
      max: 100,
    })

    .withMessage(
      "Groom name must be between 2 and 100 characters."
    ),

  body("bride_name")

    .trim()

    .notEmpty()

    .withMessage("Bride name is required.")

    .isLength({
      min: 2,
      max: 100,
    })

    .withMessage(
      "Bride name must be between 2 and 100 characters."
    ),

  body("wedding_date")

    .optional({
      nullable: true,
      checkFalsy: true,
    })

    .isISO8601()

    .withMessage(
      "Wedding date must be a valid date."
    ),

  body("venue")

    .optional()

    .trim()

    .isLength({
      max: 255,
    })

    .withMessage(
      "Venue must not exceed 255 characters."
    ),

  body("address")

    .optional()

    .trim()

    .isLength({
      max: 500,
    })

    .withMessage(
      "Address must not exceed 500 characters."
    ),

];

/*
|--------------------------------------------------------------------------
| Administrator Profile Validation
|--------------------------------------------------------------------------
*/

const updateProfileValidation = [

  body("username")

    .trim()

    .notEmpty()

    .withMessage(
      "Username is required."
    )

    .isLength({
      min: 3,
      max: 50,
    })

    .withMessage(
      "Username must be between 3 and 50 characters."
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

];

/*
|--------------------------------------------------------------------------
| Change Password Validation
|--------------------------------------------------------------------------
*/

const changePasswordValidation = [

  body("current_password")

    .notEmpty()

    .withMessage(
      "Current password is required."
    ),

  body("new_password")

    .notEmpty()

    .withMessage(
      "New password is required."
    )

    .isLength({
      min: 8,
      max: 100,
    })

    .withMessage(
      "New password must be at least 8 characters long."
    ),

  body("confirm_password")

    .notEmpty()

    .withMessage(
      "Please confirm your new password."
    )

    .custom((value, { req }) => {

      if (
        value !== req.body.new_password
      ) {

        throw new Error(
          "Passwords do not match."
        );

      }

      return true;

    }),

];

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = {

  updateWeddingValidation,

  updateProfileValidation,

  changePasswordValidation,

};