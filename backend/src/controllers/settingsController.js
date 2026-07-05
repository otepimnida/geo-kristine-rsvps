/**
 * --------------------------------------------------------
 * Settings Controller
 * --------------------------------------------------------
 * Handles administrator settings requests.
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const asyncHandler = require("../utils/asyncHandler");

const {
  sendSuccess,
} = require("../utils/response");

const settingsService = require("../services/settingsService");

/*
|--------------------------------------------------------------------------
| Get Wedding Settings
|--------------------------------------------------------------------------
*/

const getSettings = asyncHandler(async (req, res) => {

  const result =
    await settingsService.getSettings();

  return sendSuccess(
    res,
    "Settings retrieved successfully.",
    result,
    StatusCodes.OK
  );

});

/*
|--------------------------------------------------------------------------
| Update Wedding Information
|--------------------------------------------------------------------------
*/

const updateWedding = asyncHandler(async (req, res) => {

  const result =
    await settingsService.updateWedding(

      req.body,

      req.user.id

    );

  return sendSuccess(
    res,
    "Wedding information updated successfully.",
    result,
    StatusCodes.OK
  );

});

/*
|--------------------------------------------------------------------------
| Get Administrator Profile
|--------------------------------------------------------------------------
*/

const getProfile = asyncHandler(async (req, res) => {

  const result =
    await settingsService.getProfile(

      req.user.id

    );

  return sendSuccess(
    res,
    "Administrator profile retrieved successfully.",
    result,
    StatusCodes.OK
  );

});

/*
|--------------------------------------------------------------------------
| Update Administrator Profile
|--------------------------------------------------------------------------
*/

const updateProfile = asyncHandler(async (req, res) => {

  const result =
    await settingsService.updateProfile(

      req.user.id,

      req.body

    );

  return sendSuccess(
    res,
    "Administrator profile updated successfully.",
    result,
    StatusCodes.OK
  );

});

/*
|--------------------------------------------------------------------------
| Change Administrator Password
|--------------------------------------------------------------------------
*/

const changePassword = asyncHandler(async (req, res) => {

  const result =
    await settingsService.changePassword(

      req.user.id,

      req.body

    );

  return sendSuccess(
    res,
    result.message,
    result,
    StatusCodes.OK
  );

});

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/

module.exports = {

  getSettings,

  updateWedding,

  getProfile,

  updateProfile,

  changePassword,

};