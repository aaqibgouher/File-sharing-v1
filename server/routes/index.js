const express = require("express");
const authRoutes = require("./authRoutes");
const fileRoutes = require("./fileRoutes");
const authMiddleware = require("../middleware/authMiddleware");
const userRoutes = require("./userRoutes");

const router = express.Router();

// auth
router.use("/auth", authRoutes);

// files
router.use(
  "/files",
  [authMiddleware.isAuthenticated, authMiddleware.isAuthorised],
  fileRoutes
);

// users
router.use(
  "/users",
  [authMiddleware.isAuthenticated, authMiddleware.isAuthorised],
  userRoutes
);

module.exports = router;
