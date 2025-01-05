const admin = require("firebase-admin");
const serviceAccount = require("./abnormal-security-673f6-firebase-adminsdk-9724p-09559ff359.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "evallo-task.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
