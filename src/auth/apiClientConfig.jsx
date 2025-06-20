// import axios from "axios";

// const apiClientConfig = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// let accessToken = null;

// export const setAccessToken = (token) => {
//   accessToken = token;
// };

// apiClientConfig.interceptors.request.use(
//   (config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default apiClientConfig;
