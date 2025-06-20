// api.js
import axios from "axios"; // Adjust the import path as needed
// Adjust the import path as needed

// Create an Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your API's base URL
});

// Add a request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or cookies, or context)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
