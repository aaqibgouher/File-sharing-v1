import { apiRequest } from "..";
import { AUTH_LOGOUT_USER } from "../../utils/constant";

export const registerApiHelper = async (payload) => {
  return await apiRequest({
    url: "auth/register",
    method: "POST",
    data: payload,
  });
};

export const loginApiHelper = async (payload) => {
  return await apiRequest({
    url: "auth/login",
    method: "POST",
    data: payload,
  });
};

export const verifyEmailApiHelper = async (payload) => {
  return await apiRequest({
    url: "auth/verify-email",
    method: "POST",
    data: payload,
  });
};

export const logoutApiHelper = async () => {
  return await apiRequest({
    url: `auth/logout?accessId=${AUTH_LOGOUT_USER}`,
    method: "POST",
  });
};
