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
  details(title) {
    return request({
      url: `/articles/${title}`,
      method: "get",
      headers: {
        authorization: getToken() ? `Token ${getToken()}` : "",
      },
    });
  },
};

export const Profile = {
  follow(username) {
    return request({
      url: `/profiles/${username}/follow`,
      method: "post",
      headers: {
        authorization: `Token ${getToken()}`,
      },
    });
  },
  unfollow(username) {
    return request({
      url: `/profiles/${username}/follow`,
      method: "delete",
      headers: {
        authorization: `Token ${getToken()}`,
      },
    });
  },
  favorite(slug) {
    return request({
      url: `/articles/${slug}/favorite`,
      method: "post",
      headers: {
        authorization: `Token ${getToken()}`,
      },
    });
  },
  unfavorite(slug) {
    return request({
      url: `/articles/${slug}/favorite`,
      method: "DELETE",
      headers: {
        authorization: `Token ${getToken()}`,
      },
    });
  },
};

export const Comments = {
  forArticle(slug) {
    return request({
      url: `/articles/${slug}/comments`,
      method: "GET",
      headers: {
        authorization: getToken() ? `Token ${getToken()}` : "",
      },
    });
  },
  create(slug, data) {
    return request({
      url: `/articles/${slug}/comments`,
      method: "post",
      headers: {
        authorization: getToken() ? `Token ${getToken()}` : "",
      },
      data,
    });
  },
};
