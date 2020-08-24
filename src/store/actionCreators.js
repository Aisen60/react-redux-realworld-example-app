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
  CHANGE_CUTTENT_USER_TEXT,
  CHANGE_CURRENT_USER,
  CLEAN_USER_INFO,
  CLEAN_EDITOR,
  SET_EDITOR,
  ADD_EDITOR_TAG,
  DELETE_EDITOR_TAG,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
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

export const handleSettingInputChange = (data) => ({
  type: CHANGE_CUTTENT_USER_TEXT,
  data,
});

export const changeCurrentUser = (data) => ({
  type: CHANGE_CURRENT_USER,
  data,
});

export const cleanUserInfo = () => ({
  type: CLEAN_USER_INFO,
});

export const cleanEditor = () => ({
  type: CLEAN_EDITOR,
});

export const setEditor = (data) => ({
  type: SET_EDITOR,
  data,
});

export const addTagList = (data) => ({
  type: ADD_EDITOR_TAG,
  data,
});

export const deleteTagList = (data) => ({
  type: DELETE_EDITOR_TAG,
  data,
});

export const createdArticle = (data) => ({
  type: CREATE_ARTICLE,
  data,
});

export const updateArticle = (data) => ({
  type: UPDATE_ARTICLE,
  data,
});
