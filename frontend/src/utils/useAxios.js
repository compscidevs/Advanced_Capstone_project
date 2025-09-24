import axios from "axios";

// Import functions for auth logic
import { isAccessTokenExpired, setAuthUser, getRefreshToken } from "./auth";

// Import base url from constants
import { BASE_URL } from "./constants";

// Import cookie library
import Cookies from "js-cookie";

const useAxios = async () => {
  // Get access and refresh tokens from cookies
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  // Create an Axios instance with base URL
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${access_token}`, // Set Authorization header with access token
    },
  });

  // Request interceptor to handle access token refresh
  axiosInstance.interceptors.request.use(async (req) => {
    // Check if access token is not expired
    if (!isAccessTokenExpired(access_token)) {
      return req; // If not expired, return the request as is
    }

    // If expired, get a new access token using refresh token
    const response = await getRefreshToken(refresh_token);

    // Update user auth state with new tokens
    setAuthUser(response.access, response.refresh);

    // Update the request's Authorization header with the new access token
    req.headers.Authorization = `Bearer ${response.data.access}`;

    // Return the request with updated header
    return req;
  });

  // Return the configured Axios instance
  return axiosInstance;
};

export default useAxios;
