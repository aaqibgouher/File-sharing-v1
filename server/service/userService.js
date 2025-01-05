const { UserModel, FileModel } = require("../models");
const { USER_ROLE_CONSTANTS } = require("../utils/constants");

const getUsers = async (payload, exclude = "") => {
  const { role, userId } = payload;
  const query = {};

  if (role && role === USER_ROLE_CONSTANTS.USER) {
    query.role = role;
    query.is_registered = true;
    query.is_otp_verified = true;
    exclude = "_id name email";
    query._id = { $ne: userId };
  } else {
    exclude = "-password";
  }

  return UserModel.find(query).select(exclude);
};

const getStats = async (payload) => {
  const { userId, role } = payload;
  const stats = {};

  // Total Users
  if (role === USER_ROLE_CONSTANTS.ADMIN) {
    stats.totalUsers = await UserModel.countDocuments();
    stats.totalFiles = await FileModel.countDocuments();
    stats.sharedFiles = await FileModel.countDocuments({
      "shared_with.0": { $exists: true },
    });
  } else if (role === USER_ROLE_CONSTANTS.USER) {
    stats.totalFiles = await FileModel.countDocuments({ user: userId });
    stats.sharedFiles = await FileModel.countDocuments({
      shared_with: { $elemMatch: { user: userId } },
    });
  }

  return stats;
};

module.exports = {
  getUsers,
  getStats,
};
