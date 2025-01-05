const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

// get all users
router.get("/", userController.getUsers);

// get stats
router.get("/stats", userController.getStats);

module.exports = router;
