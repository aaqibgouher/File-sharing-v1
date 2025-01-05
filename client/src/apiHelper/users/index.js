import { apiRequest } from "..";
import {
  USERS_GET_STATS,
  USERS_GET_USER_TYPE_USERS,
  USERS_GET_USERS,
} from "../../utils/constant";

export const getUsersApiHelper = async (payload) => {
  const { role } = payload;

  return await apiRequest({
    url: `users?accessId=${
      role === "USER" ? USERS_GET_USER_TYPE_USERS : USERS_GET_USERS
    }&role=${role}`,
    method: "GET",
  });
};

export const getStatsApiHelper = async () => {
  return await apiRequest({
    url: `users/stats?accessId=${USERS_GET_STATS}`,
    method: "GET",
  });
};
