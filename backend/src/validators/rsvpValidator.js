const { body } = require("express-validator");

const rsvpValidator = [

  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({
      min: 3,
      max: 100,
    })
    .withMessage(
      "Full name must be between 3 and 100 characters."
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("attendance")
    .notEmpty()
    .withMessage("Attendance selection is required.")
    .isBoolean()
    .withMessage(
      "Attendance must be true or false."
    ),

  body("guest_count").custom((value, { req }) => {
    const attendance = req.body.attendance;

    const isAttending =
      attendance === true ||
      attendance === "true";

    if (isAttending) {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        throw new Error(
          "Guest count is required when attending."
        );
      }

      const guestCount = Number(value);

      if (
        !Number.isInteger(guestCount) ||
        guestCount < 1 ||
        guestCount > 5
      ) {
        throw new Error(
          "Guest count must be between 1 and 5."
        );
      }
    }

    return true;
  }),

  body("message")
    .optional()
    .trim()
    .isLength({
      max: 300,
    })
    .withMessage(
      "Message cannot exceed 300 characters."
    ),
];

module.exports = {
  rsvpValidator,
};