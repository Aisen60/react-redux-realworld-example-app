import axios from "axios";
import { API_URL } from "../constants/confog";
import { getToken } from "../utils/index";

const service = axios.create({
  baseURL: API_URL,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Token ${getToken()}`;
  return config;
});

const encode = encodeURIComponent;

const Auth = {
  current: () => service.get("/user"),
  login: (email, password) =>
    service.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    service.post("/users", { user: { username, email, password } }),
  save: (user) => service.put("/user", { user }),
};

const Tags = {
  getAll: () => service.get("/tags"),
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const omitSlug = (article) => Object.assign({}, article, { slug: undefined });

const Articles = {
  all: (page) => service.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    service.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    service.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug) => service.del(`/articles/${slug}`),
  favorite: (slug) => service.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    service.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => service.get("/articles/feed?limit=10&offset=0"),
  get: (slug) => service.get(`/articles/${slug}`),
  unfavorite: (slug) => service.del(`/articles/${slug}/favorite`),
  update: (article) =>
    service.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article) => service.post("/articles", { article }),
};

const Comments = {
  create: (slug, comment) =>
    service.post(`/articles/${slug}/comments`, { comment }),
  del: (slug, commentId) =>
    service.delete(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug) => service.get(`/articles/${slug}/comments`),
};

const Profile = {
  follow: (username) => service.post(`/profiles/${username}/follow`),
  get: (username) => service.get(`/profiles/${username}`),
  unfollow: (username) => service.delete(`/profiles/${username}/follow`),
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
};
