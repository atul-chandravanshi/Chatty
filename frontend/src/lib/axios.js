import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

axios.post("https://chatty-1-4a1n.onrender.com/api/login", data, {
  withCredentials: true,
});