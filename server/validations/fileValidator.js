const Joi = require("joi");
const {
  FILE_SHARED_STATUS,
  FILE_SHARED_WITH_ACCESS,
} = require("../utils/constants");

const addFile = Joi.object({
  fieldname: Joi.string().required().messages({
    "any.required": "Field name is required",
  }),
  originalname: Joi.string().required().messages({
    "any.required": "Original name is required",
  }),
  encoding: Joi.string().required().messages({
    "any.required": "Encoding is required",
  }),
  mimetype: Joi.string()
    .valid("image/avif", "image/jpeg", "image/png", "image/gif")
    .required()
    .messages({
      "any.only": `Type must be one of image, video, file etc`,
    }),
  buffer: Joi.binary().required().messages({
    "any.required": "Buffer is required",
  }),
  size: Joi.number().max(5000000).required().messages({
    "any.required": "Size is required",
  }),
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
});

const getFile = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
  fileId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "File ID must be a valid MongoDB ObjectId",
      "any.required": "File ID is required",
    }),
});

const shareFile = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
  fileId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "File ID must be a valid MongoDB ObjectId",
      "any.required": "File ID is required",
    }),
  sharedWith: Joi.array()
    .items(
      Joi.object({
        user: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/) // Matches MongoDB ObjectId format
          .required()
          .messages({
            "string.pattern.base":
              "Shared user ID must be a valid MongoDB ObjectId",
            "any.required": "Shared user ID is required",
          }),
        type: Joi.string()
          .valid(...Object.keys(FILE_SHARED_WITH_ACCESS))
          .required()
          .messages({
            "any.required": "Shared type is required",
            "any.only": `Shared type must be one of ${Object.keys(
              FILE_SHARED_WITH_ACCESS
            ).join(", ")}`,
          }),
      })
    )
    .when("sharedStatus", {
      is: "RESTRICTED",
      then: Joi.array().min(1).required().messages({
        "array.base": "SharedWith must be an array when status is RESTRICTED",
        "array.min":
          "At least one shared user is required when status is RESTRICTED",
        "any.required": "SharedWith is required when status is RESTRICTED",
      }),
      otherwise: Joi.array().optional(),
    }),
  sharedStatus: Joi.string()
    .valid(...Object.keys(FILE_SHARED_STATUS))
    .required()
    .messages({
      "any.required": "Shared status is required",
      "any.only": `Shared status must be one of ${Object.keys(
        FILE_SHARED_STATUS
      ).join(", ")}`,
    }),
});

const getSharedFiles = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
});

module.exports = {
  addFile,
  getFile,
  shareFile,
  getSharedFiles,
};
