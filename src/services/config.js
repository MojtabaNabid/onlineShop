import axios from "axios";

const api = axios.create({ BaseURL: "https://fakestoreapi.com" });

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default api;
