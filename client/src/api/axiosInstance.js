import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://mern-lms-app-backend.onrender.com",
});

// Request interceptor: attach token if exists
axiosInstance.interceptors.request.use(
  (config) => {
    // Public endpoints that don't need token
    const publicEndpoints = [
      "/auth/login",
      "/auth/register",
      "/student/course/public/landing",
    ];

    const isPublic = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublic) {
      const accessToken =
        JSON.parse(sessionStorage.getItem("accessToken")) ||
        JSON.parse(localStorage.getItem("accessToken"));

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.warn(`[Axios] No access token for request to ${config.url}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: log 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error(
        `[Axios] 401 Unauthorized: ${error.config.url}`,
        error.response.data
      );
      // Optional: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
