const express = require("express");

const router = express.Router();

const rsvpController = require("../controllers/rsvpController");

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const {
  rsvpValidator,
} = require("../validators/rsvpValidator");

router.post(
  "/",
  rsvpValidator,
  validate,
  rsvpController.createRSVP
);

router.get(
  "/",
  auth,
  rsvpController.getAllRSVPs
);

router.get(
  "/:id",
  auth,
  rsvpController.getRSVPById
);

router.put(
  "/:id",
  auth,
  rsvpValidator,
  validate,
  rsvpController.updateRSVP
);

router.delete(
  "/:id",
  auth,
  rsvpController.deleteRSVP
);

module.exports = router;