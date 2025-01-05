const mongoose = require("mongoose");
const {
  MODEL_CONSTANTS,
  FILE_SHARED_WITH_ACCESS,
  FILE_SHARED_STATUS,
} = require("../utils/constants");

// shared schema
const sharedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.USER.MODEL,
      required: true,
    },
    type: {
      type: String,
      enum: [...Object.keys(FILE_SHARED_WITH_ACCESS)],
      default: FILE_SHARED_WITH_ACCESS.VIEW.value,
    },
  },
  { timestamps: true }
);

// files schema
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.USER.MODEL,
      required: true,
    },
    shared_with: {
      type: [sharedSchema],
      default: [],
    },
    shared_status: {
      type: String,
      enum: [...Object.keys(FILE_SHARED_STATUS)],
      default: FILE_SHARED_STATUS.OPEN.value,
    },
  },
  { timestamps: true }
);

// model
const FileModel = mongoose.model(
  MODEL_CONSTANTS.FILE.MODEL,
  fileSchema,
  MODEL_CONSTANTS.FILE.TABLE
);

// exporting model
module.exports = FileModel;
