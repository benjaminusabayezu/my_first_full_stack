import axios from "axios";

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/API",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  const isLoginRequest = config.url?.includes("/login/");

  if (token && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
