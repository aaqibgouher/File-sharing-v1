const { MESSAGE_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");
const authService = require("../service/authService");

const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_REGISTERED, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const data = await authService.verifyEmail(req.body);

    return Output.success(
      res,
      MESSAGE_CONSTANTS.EMAIL_VERIFIED_SUCCESSFULLY,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_LOGIN, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const logout = async (req, res) => {
  try {
    const data = await authService.logout({ userId: req.user._id.toString() });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_LOGOUT, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const getMe = async (req, res) => {
  try {
    const data = req.user;

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_USER_INFO,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  getMe,
};
