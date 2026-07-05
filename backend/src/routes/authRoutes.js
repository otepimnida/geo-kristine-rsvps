const express = require("express");

const router = express.Router();


const authController = require("../controllers/authController");


const auth = require("../middleware/auth");

const validate = require("../middleware/validate");

const {
  loginValidator,
} = require("../validators/authValidator");

router.post(
  "/login",
  loginValidator,
  validate,
  authController.login
);

router.get(
  "/profile",
  auth,
  authController.profile
);

router.post(
  "/logout",
  auth,
  authController.logout
);

module.exports = router;