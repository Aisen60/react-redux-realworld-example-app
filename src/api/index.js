import request from "../utils/request";
import { getToken } from "../utils/index";

export const User = {
  current() {
    return request({
      url: "/user",
      method: "get",
      headers: {
        authorization: `Token ${getToken()}`,
      },
    });
  },
  login(data) {
    return request({
      url: "/users/login",
      method: "POST",
      data,
    });
  },
  register(data) {
    return request({
      url: "/users",
      method: "POST",
      data,
    });
  },
};

export const Tags = {
  getAll() {
    return request({
      url: "/tags",
      method: "get",
    });
  },
};

export const Articles = {
  all(params) {
    return request({
      url: "/articles",
      method: "get",
      params,
    });
  },
};
