const commonUtils = require("../utils/common");
const { MESSAGE_CONSTANTS } = require("../utils/constants");
const authService = require("../service/authService");
const Output = require("../utils/output");

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    // if token not true
    if (!token) throw MESSAGE_CONSTANTS.TOKEN_IS_REQUIRED;

    // verify token
    const decoded = await commonUtils.verifyJWT(token);

    // get user info, check if is_verified & status
    const user = await authService.getUser(
      { _id: decoded.userId, token },
      "-password"
    );

    if (!user) throw MESSAGE_CONSTANTS.INVALID_USER_TOKEN_LOGIN_AGAIN;
    if (!user.is_registered) throw MESSAGE_CONSTANTS.USER_IS_NOT_REGISTERED;
    if (!user.is_otp_verified) throw MESSAGE_CONSTANTS.OTP_IS_NOT_VERIFIED;

    // add to req
    req.user = user;

    next();
  } catch (error) {
    return await Output.error(res, error);
  }
};

const isAuthorised = async (req, res, next) => {
  try {
    const { accessId } = req.query;
    const { permissions } = req.user;

    // check if user has access or not
    if (!accessId) throw MESSAGE_CONSTANTS.ACCESS_ID_IS_REQUIRED;
    if (!permissions.get(accessId))
      throw MESSAGE_CONSTANTS.YOU_DONT_HAVE_ACCESS_TO_THIS_REQUEST;

    next();
  } catch (error) {
    return await Output.error(res, error);
  }
};

module.exports = {
  isAuthenticated,
  isAuthorised,
};
