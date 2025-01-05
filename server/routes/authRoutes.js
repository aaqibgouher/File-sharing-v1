const express = require("express");
const authController = require("../controller/authController");
const authMiddlware = require("../middleware/authMiddleware");

const router = express.Router();

// register
router.post("/register", authController.register);

// verify email
router.post("/verify-email", authController.verifyEmail);

// login
router.post("/login", authController.login);

// logout
router.post(
  "/logout",
  [authMiddlware.isAuthenticated, authMiddlware.isAuthorised],
  authController.logout
);

// me
router.get(
  "/me",
  [authMiddlware.isAuthenticated, authMiddlware.isAuthorised],
  authController.getMe
);

module.exports = router;
