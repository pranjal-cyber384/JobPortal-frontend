import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("watchStoreAuth");

  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

export default api;