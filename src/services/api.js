import axios from "axios";

const api = axios.create({
  baseURL: "http://your-api-url.com", // Thay bằng URL API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptors nếu cần (ví dụ: thêm token vào headers)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
