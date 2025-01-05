import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const getParsedUserData = () => {
  const userData = localStorage.getItem("userData");

  // Parse userData if it's stored as JSON
  const parsedUserData = userData ? JSON.parse(userData) : null;

  return parsedUserData;
};

export const getToken = () => {
  const parsedUserData = getParsedUserData();
  return parsedUserData?.token || null;
};

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};
