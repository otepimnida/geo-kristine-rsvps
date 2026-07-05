const { StatusCodes } = require("http-status-codes");

const asyncHandler = require("../utils/asyncHandler");

const {
  sendSuccess,
} = require("../utils/response");

const rsvpService = require("../services/rsvpService");

/*
|--------------------------------------------------------------------------
| Public RSVP
|--------------------------------------------------------------------------
*/

const createRSVP = asyncHandler(async (req, res) => {
  const result =
    await rsvpService.createRSVP(
      req.body
    );

  return sendSuccess(
    res,
    "RSVP submitted successfully.",
    result,
    StatusCodes.CREATED
  );
});

/*
|--------------------------------------------------------------------------
| Get All RSVP
|--------------------------------------------------------------------------
*/

const getAllRSVPs = asyncHandler(async (req, res) => {
  const result =
    await rsvpService.getAllRSVPs();

  return sendSuccess(
    res,
    "RSVP records retrieved successfully.",
    result,
    StatusCodes.OK
  );
});

/*
|--------------------------------------------------------------------------
| Get RSVP
|--------------------------------------------------------------------------
*/

const getRSVPById = asyncHandler(async (req, res) => {
  const result =
    await rsvpService.getRSVPById(
      req.params.id
    );

  return sendSuccess(
    res,
    "RSVP retrieved successfully.",
    result,
    StatusCodes.OK
  );
});

/*
|--------------------------------------------------------------------------
| Update RSVP
|--------------------------------------------------------------------------
*/

const updateRSVP = asyncHandler(async (req, res) => {

  const result =
    await rsvpService.updateRSVP(

      req.params.id,

      req.body,

      req.user.id

    );

  return sendSuccess(
    res,
    "RSVP updated successfully.",
    result,
    StatusCodes.OK
  );

});

/*
|--------------------------------------------------------------------------
| Delete RSVP
|--------------------------------------------------------------------------
*/

const deleteRSVP = asyncHandler(async (req, res) => {

  await rsvpService.deleteRSVP(

    req.params.id,

    req.user.id

  );

  return sendSuccess(
    res,
    "RSVP deleted successfully.",
    null,
    StatusCodes.OK
  );

});

module.exports = {

  createRSVP,

  getAllRSVPs,

  getRSVPById,

  updateRSVP,

  deleteRSVP,

};