const mongoose = require("mongoose");
const { USER_ROLE_CONSTANTS, MODEL_CONSTANTS } = require("../utils/constants");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: "",
    },
    is_registered: {
      type: Boolean,
      default: false,
    },
    is_otp_verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: [...Object.values(USER_ROLE_CONSTANTS)],
      default: USER_ROLE_CONSTANTS.USER,
    },
    permissions: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model(
  MODEL_CONSTANTS.USER.MODEL,
  userSchema,
  MODEL_CONSTANTS.USER.TABLE
);

// exporting model
module.exports = UserModel;
