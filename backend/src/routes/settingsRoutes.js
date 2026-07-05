/**
 * --------------------------------------------------------
 * Settings Routes
 * --------------------------------------------------------
 * Handles administrator settings routes.
 * --------------------------------------------------------
 */

const express = require("express");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

const auth = require("../middleware/auth");

const validate = require("../middleware/validate");

/*
|--------------------------------------------------------------------------
| Validators
|--------------------------------------------------------------------------
*/

const {

  updateWeddingValidation,

  updateProfileValidation,

  changePasswordValidation,

} = require("../validators/settingsValidator");

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

const {

  getSettings,

  updateWedding,

  getProfile,

  updateProfile,

  changePassword,

} = require("../controllers/settingsController");

/*
|--------------------------------------------------------------------------
| Wedding Settings
|--------------------------------------------------------------------------
*/

/**
 * GET /api/settings
 * Retrieve wedding information
 */
router.get(
  "/",
  auth,
  getSettings
);

/**
 * PUT /api/settings/wedding
 * Update wedding information
 */
router.put(
  "/wedding",
  auth,
  updateWeddingValidation,
  validate,
  updateWedding
);

/*
|--------------------------------------------------------------------------
| Administrator Profile
|--------------------------------------------------------------------------
*/

/**
 * GET /api/settings/profile
 * Retrieve administrator profile
 */
router.get(
  "/profile",
  auth,
  getProfile
);

/**
 * PUT /api/settings/profile
 * Update administrator profile
 */
router.put(
  "/profile",
  auth,
  updateProfileValidation,
  validate,
  updateProfile
);

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

/**
 * PUT /api/settings/password
 * Change administrator password
 */
router.put(
  "/password",
  auth,
  changePasswordValidation,
  validate,
  changePassword
);

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/

module.exports = router;