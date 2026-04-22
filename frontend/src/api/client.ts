import axios from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8080/api";

export const authBaseUrl = apiBaseUrl.replace(/\/api$/, "");

const client = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export default client;
