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


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://mern-lms-app-backend.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Skip token for specific public routes
    const publicEndpoints = [
      "/student/course/public/landing",
      // Add more public routes here if needed
    ];

    const isPublic = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublic) {
      const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;

