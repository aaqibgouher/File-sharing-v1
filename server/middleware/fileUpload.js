const multer = require("multer");

// Configure Multer storage (store files in memory for direct upload to Firebase)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
