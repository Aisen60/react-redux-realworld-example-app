import axios from "axios";
import { API_URL } from "./confog";

const service = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default service;
