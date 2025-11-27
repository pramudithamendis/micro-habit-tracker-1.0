import axios from "axios";

const API = axios.create({
  // baseURL: "https://micro-habit-tracker-10-production.up.railway.app/api",
  baseURL: "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
