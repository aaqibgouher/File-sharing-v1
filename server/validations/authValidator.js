const Joi = require("joi");
const { USER_ROLE_CONSTANTS } = require("../utils/constants");

// Register validation schema
const register = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  role: Joi.string()
    .valid(USER_ROLE_CONSTANTS.ADMIN, USER_ROLE_CONSTANTS.USER)
    .messages({
      "any.only": "Role must be either 'admin' or 'user'",
    }),
});

// is registered
const isRegistered = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  otp: Joi.string()
    .pattern(/^[0-9]{6}$/) // Ensuring OTP is exactly 6 digits
    .required()
    .messages({
      "string.pattern.base": "OTP must be exactly 6 digits",
      "any.required": "OTP is required",
    }),
});

const login = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const logout = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
});

module.exports = {
  register,
  isRegistered,
  login,
  logout,
};
