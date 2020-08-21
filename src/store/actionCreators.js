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
