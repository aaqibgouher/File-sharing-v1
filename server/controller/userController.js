const userService = require("../service/userService");
const { MESSAGE_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");

const getUsers = async (req, res) => {
  try {
    const data = await userService.getUsers({
      ...req.query,
      userId: req.user._id.toString(),
    });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_GET_USERS, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const getStats = async (req, res) => {
  try {
    const data = await userService.getStats({
      userId: req.user._id.toString(),
      role: req.user.role,
    });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_GET_STATS, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getUsers,
  getStats,
};
