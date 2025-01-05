const express = require("express");
const fileController = require("../controller/fileController");
const fileUploadMiddleware = require("../middleware/fileUpload");

const router = express.Router();

// get files
router.get("/", fileController.getFiles);

// add file
router.post("/", fileUploadMiddleware.single("file"), fileController.addFile);

// get all shared file
router.get("/shared", fileController.getSharedFiles);

// get file
router.get("/:fileId", fileController.getFile);

// share file to other users
router.post("/:fileId/share", fileController.shareFile);

// get shared file info
router.get("/:fileId/share", fileController.getSharedFile);

module.exports = router;
