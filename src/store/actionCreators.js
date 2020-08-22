import {
  INITUSERINFO,
  GETUSERINFO,
  USERLOGIN,
  USERREGISTER,
  USERERROR,
  CHANGEAPPNAV,
  GETALLTAG,
  INITALLTAG,
  CHANGEHOMETAB,
  INITGLOBALARTICLESlIST,
  GETGLOBALARTICLESlIST,
  CHANGEGLOBALOFFSET,
  GETARTICLEDETAILS,
  INITARTICLEDETAILS,
  FOLLOW,
  UNFOLLOW,
  UPDATEARTICLEAUTHOR,
  FAVORITRARTICLE,
  UNFAVORITRARTICLE,
  GETARTICLECOMMENTS,
  INITARTICLECOMMENTS,
  CREATEARTICLECOMMENTS,
  ADDARTICLECOMMENTS,
} from "./actionTypes";

export const initUserInfo = (data) => ({
  type: INITUSERINFO,
  data,
});

export const getUserInfo = () => ({
  type: GETUSERINFO,
});

export const userLogin = (data) => ({
  type: USERLOGIN,
  data,
});

export const userRegister = (data) => ({
  type: USERREGISTER,
  data,
});

export const userError = (data) => ({
  type: USERERROR,
  data,
});

export const changeAppNav = (data) => ({
  type: CHANGEAPPNAV,
  data,
});

export const getAllTag = () => ({
  type: GETALLTAG,
});

export const initAllTag = (data) => ({
  type: INITALLTAG,
  data,
});

export const changeHomeTab = (data) => ({
  type: CHANGEHOMETAB,
  data,
});

export const getGlobalArticlesList = (data) => ({
  type: GETGLOBALARTICLESlIST,
  data,
});

export const initGlobalArticlesList = (data) => ({
  type: INITGLOBALARTICLESlIST,
  data,
});

export const changeGlobalLimit = (data) => ({
  type: CHANGEGLOBALOFFSET,
  data,
});

export const getArticleDetails = (data) => ({
  type: GETARTICLEDETAILS,
  data,
});

export const initArticleDetails = (data) => ({
  type: INITARTICLEDETAILS,
  data,
});

export const followUser = (data) => ({
  type: FOLLOW,
  data,
});

export const unFollowUser = (data) => ({
  type: UNFOLLOW,
  data,
});

export const updateArticleAuthor = (data) => ({
  type: UPDATEARTICLEAUTHOR,
  data,
});

export const favoriteArticle = (data) => ({
  type: FAVORITRARTICLE,
  data,
});

export const UnFavoriteArticle = (data) => ({
  type: UNFAVORITRARTICLE,
  data,
});

export const getArticleComments = (data) => ({
  type: GETARTICLECOMMENTS,
  data,
});

export const initArticleComments = (data) => ({
  type: INITARTICLECOMMENTS,
  data,
});

export const createArticleComments = (data) => ({
  type: CREATEARTICLECOMMENTS,
  data,
});

export const addArticleComments = (data) => ({
  type: ADDARTICLECOMMENTS,
  data,
});
