import axios from "axios";
import { BASE_URL } from "./constants";

// Create an Axios instance with a configured base URL
const apiInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests made with this instance

  // Set a timeout of 5 seconds for requests
  timeout: 5000,

  // Set default headers for all requests
  headers: {
    "Content-Type": "application/json", // Indicate requests will send JSON data
    Accept: "application/json",         // Indicate the instance expects JSON responses
  },
});

export default apiInstance;
