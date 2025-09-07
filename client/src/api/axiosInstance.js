// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000",
//   // baseURL: "https://mern-lms-app-backend.onrender.com",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// export default axiosInstance;


// import axios from "axios";

// const axiosInstance = axios.create({
//   // baseURL: "http://localhost:5000",
//   baseURL: "https://mern-lms-app-backend.onrender.com",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Skip token for specific public routes
//     const publicEndpoints = [
//       "/student/course/public/landing",
//       // Add more public routes here if needed
//     ];

//     const isPublic = publicEndpoints.some((endpoint) =>
//       config.url.includes(endpoint)
//     );

//     if (!isPublic) {
//       const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// export default axiosInstance;

// src/utils/axiosInstance.js
import axios from "axios";

// Create instance with baseURL
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000", // for local dev
  baseURL: "https://mern-lms-app-backend.onrender.com", // for deployed backend
});

// ✅ Public endpoints (no token required)
const publicEndpoints = [
  "/student/public-course/public/landing", // Landing page courses
  "/student/course/public/landing",        // (optional fallback if backend uses this path)
];

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request is for a public route
    const isPublic = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublic) {
      const accessToken =
        JSON.parse(sessionStorage.getItem("accessToken")) || "";

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

// ✅ Optional: Retry logic for Render cold starts
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.code === "ECONNABORTED" ||
      error.message.includes("Network Error")
    ) {
      // Retry max 2 times with delay
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      if (originalRequest._retryCount < 2) {
        originalRequest._retryCount++;
        console.warn(`Retrying request... attempt ${originalRequest._retryCount}`);
        await new Promise((res) => setTimeout(res, 2000)); // 2s delay
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


