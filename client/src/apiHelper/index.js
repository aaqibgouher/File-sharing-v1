import axios from "axios";
import Toast from "../components/general/toast";
import { getToken, removeData } from "../utils/common";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      Toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    // Handle errors and show an error toast
    console.log(error, "from error ******");
    const errorMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.error ||
      "Something went wrong. Please try again.";

    Toast.error(errorMessage);

    // token expired, logout
    if (errorMessage === "Invalid user token, please login again") {
      removeData("userData");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Generic function for making API requests
export const apiRequest = async (config) => {
  const response = await axiosInstance(config);
  return response.data;
};

export default axiosInstance;
