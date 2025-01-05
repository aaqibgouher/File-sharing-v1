const { FileModel } = require("../models");
const { MESSAGE_CONSTANTS, FILE_SHARED_STATUS } = require("../utils/constants");
const bucket = require("../utils/firebase");
const fileValidator = require("../validations/fileValidator");

const getFiles = async (payload) => {
  return await FileModel.find(payload).populate("user", "_id name email");
};

const addFile = async (payload) => {
  // validation
  const { error, value } = fileValidator.addFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   desctructure
  const { fieldname, originalname, encoding, mimetype, buffer, size, userId } =
    payload;

  // upload file to firebase
  const blob = bucket.file(`upload/${Date.now()}_${originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: mimetype,
    },
  });

  blobStream.on("error", (err) => {
    console.log(err, "ERROR ----");
    throw err;
  });

  blobStream.on("finish", async () => {
    try {
      // Make file public
      //   await blob.makePublic();

      // Get public URL
      //   const publicUrl = `${process.env.FIREBASE_URL}/${bucket.name}/${blob.name}`;

      await FileModel.create({
        name: originalname,
        encoding,
        mimeType: mimetype,
        size,
        path: blob.name,
        user: userId,
      });
    } catch (err) {
      console.error("Error making file public or saving to DB:", err);
      throw MESSAGE_CONSTANTS.ERROR_WHILE_UPLOADING_FILE;
    }
  });

  blobStream.end(buffer);

  return true;
};

const generateSignedUrl = async (filePath, accessType) => {
  try {
    // Define the options for the signed URL
    const options = {
      version: "v4",
      action: accessType === "download" ? "read" : "read",
      expires: Date.now() + 5 * 60 * 1000, // Link valid for 5 minutes
    };

    // Get the signed URL
    const [url] = await bucket.file(filePath).getSignedUrl(options);

    return url;
  } catch (err) {
    console.error("Error generating signed URL:", err);
    throw new Error("Unable to generate signed URL");
  }
};

const getFile = async (payload) => {
  // validation
  const { error, value } = fileValidator.getFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { userId, fileId } = payload;

  //   check if file exists or not
  const file = await get({ _id: fileId, user: userId });

  //   if file not found
  if (!file) throw MESSAGE_CONSTANTS.FILE_NOT_FOUND;

  //   generate signed url & return
  const signedUrl = await generateSignedUrl(file.path);

  return {
    ...file.toObject(),
    signedUrl,
  };
};

const shareFile = async (payload) => {
  // validation
  const { error, value } = fileValidator.shareFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   desctructure
  let { userId, fileId, sharedWith, sharedStatus } = payload;

  //   check if file exists or not
  const file = await get({ _id: fileId, user: userId });

  //   if file not found
  if (!file) throw MESSAGE_CONSTANTS.FILE_NOT_FOUND;

  //   if its open, set sharedWith to empty
  if (sharedStatus === FILE_SHARED_STATUS.OPEN.value) sharedWith = [];

  //   update sharedWith & status
  const updateData = {};

  updateData.shared_with = sharedWith;
  updateData.shared_status = sharedStatus;

  //   get file
  const fileInfo = await FileModel.findByIdAndUpdate(fileId, updateData, {
    new: true,
  });

  //   generate signed url & return
  const signedUrl = await generateSignedUrl(file.path);

  return {
    ...fileInfo.toObject(),
    signedUrl,
  };
};

const getSharedFiles = async (payload) => {
  // validation
  const { error, value } = fileValidator.getSharedFiles.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { userId } = payload;

  //   fetch files where user id exists in shared_with
  return await FileModel.find({
    shared_with: {
      $elemMatch: { user: userId },
    },
  }).populate("user", "_id name email");
};

const getSharedFile = async (payload) => {
  // validation
  const { error, value } = fileValidator.getFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { userId, fileId } = payload;

  //   check if file exists?
  const file = await get({ _id: fileId });

  //   if file not found
  if (!file) throw MESSAGE_CONSTANTS.FILE_NOT_FOUND;

  //   if exist, is it shared by me?
  const sharedInfo = file?.shared_with?.find(
    (shared) => shared?.user?.toString() === userId
  );

  if (!sharedInfo) throw MESSAGE_CONSTANTS.FILE_NOT_SHARED_WITH_YOU;

  //   generate signed url
  const signedUrl = await generateSignedUrl(file.path);

  return {
    ...file.toObject(),
    signedUrl,
  };
};

const add = async (payload) => {
  return await FileModel.create(payload);
};

const get = async (payload) => {
  return await FileModel.findOne(payload);
};

module.exports = {
  getFiles,
  addFile,
  add,
  getFile,
  get,
  shareFile,
  getSharedFiles,
  getSharedFile,
};
