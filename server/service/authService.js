const { UserModel } = require("../models");
const {
  MESSAGE_CONSTANTS,
  USER_ROLE_CONSTANTS,
  ACCESS_CONTROL_PERMISSIONS,
} = require("../utils/constants");
const authValidator = require("../validations/authValidator");
const commonUtils = require("../utils/common");

const register = async (payload) => {
  // validation
  const { error, value } = authValidator.register.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { name, email, password, role } = payload;

  //   check if user exists by email or phone
  const user = await getUser({
    email: email,
  });

  //   if user exists, throw error
  if (user) throw MESSAGE_CONSTANTS.EMAIL_ALREADY_EXISTS;

  //   hash password
  const encryptPass = await commonUtils.encryptPass(password);

  //   generate otp
  const otp = commonUtils.generateOtp();

  // add user
  await addUser({
    name,
    email,
    password: encryptPass,
    is_registered: true,
    otp,
    role: role || "USER",
  });

  //   send verification email
  await commonUtils.sendEmail(
    email,
    MESSAGE_CONSTANTS.EMAIL_VERIFICATION_SUBJECT,
    MESSAGE_CONSTANTS.EMAIL_VERIFICATION_TEXT + otp
  );

  return true;
};

const verifyEmail = async (payload) => {
  // validation
  const { error, value } = authValidator.isRegistered.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { email, otp } = payload;

  //   check if user exists by email
  const user = await getUser({
    email: email,
  });

  //   if user exists, throw error
  if (!user) throw MESSAGE_CONSTANTS.INVALID_EMAIL;

  //   if user is not registered i.e is_registered false
  if (!user?.is_registered) throw MESSAGE_CONSTANTS.USER_IS_NOT_REGISTERED;

  //   match otp
  if (otp !== user?.otp) throw MESSAGE_CONSTANTS.INVALID_OTP;

  //   access control (modules + permissions)
  const accessControl = getPermissions(user?.role);

  //   generate token
  const token = await commonUtils.generateJWT({
    userId: user._id,
    permissions: accessControl?.permissions,
  });

  //   all good, generate token, set otp verified, token & permissions
  const updatedUserInfo = await updateUser(
    { _id: user._id },
    {
      otp: "",
      is_otp_verified: true,
      token,
      permissions: accessControl?.permissions,
    }
  );
  return {
    ...updatedUserInfo.toObject(),
    modules: accessControl?.modules,
  };
};

const login = async (payload) => {
  // validation
  const { error, value } = authValidator.login.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { email, password } = payload;

  //   check if user exists by email
  const user = await getUser({
    email: email,
  });

  //   if user exists, throw error
  if (!user) throw MESSAGE_CONSTANTS.INVALID_EMAIL;

  //   check if password matched?
  if (!(await commonUtils.verifyPass(user.password, password)))
    throw MESSAGE_CONSTANTS.INVALID_EMAIL_AND_PASSWORD;

  //   if user is not registered i.e is_registered false
  if (!user?.is_registered) throw MESSAGE_CONSTANTS.USER_IS_NOT_REGISTERED;

  //   if otp is not verified i.e is_otp_verified false
  if (!user?.is_otp_verified) throw MESSAGE_CONSTANTS.USER_IS_NOT_REGISTERED;

  //   access control (modules + permissions)
  const accessControl = getPermissions(user?.role);

  //   generate token
  const token = await commonUtils.generateJWT({
    userId: user._id,
    permissions: accessControl?.permissions,
  });

  //   all good, generate token, set otp verified, token & permissions
  const updatedUserInfo = await updateUser(
    { _id: user._id },
    {
      token,
      permissions: accessControl?.permissions,
    }
  );

  return {
    ...updatedUserInfo.toObject(),
    modules: accessControl?.modules,
    permissions: accessControl?.permissions,
  };
};

const logout = async (payload) => {
  // validation
  const { error, value } = authValidator.logout.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId } = payload;

  //   for now, empty token for logout user
  await updateUser({ _id: userId }, { token: "" });

  return true;
};

const getUser = async (query, exclude = "") => {
  return UserModel.findOne(query).select(exclude);
};

const addUser = async (payload) => {
  return UserModel.create(payload);
};

const updateUser = async (condition, dataToUpdate) => {
  return await UserModel.findOneAndUpdate(
    condition,
    { $set: dataToUpdate },
    { new: true }
  ).select("-password");
};

const getPermissions = (role) => {
  const permissions = ACCESS_CONTROL_PERMISSIONS;

  return permissions[role];
};

module.exports = {
  register,
  getUser,
  addUser,
  verifyEmail,
  updateUser,
  getPermissions,
  login,
  logout,
};
