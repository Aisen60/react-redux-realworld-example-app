import produce from "immer";
import { saveToken } from "../utils";
import {
  INITUSERINFO,
  USERERROR,
  CHANGEAPPNAV,
  INITALLTAG,
  CHANGEHOMETAB,
  INITGLOBALARTICLESlIST,
  CHANGEGLOBALOFFSET,
} from "./actionTypes";

const defaultState = {
  userInfo: {},
  navActive: "Home",
  tags: [],
  tab: "Global",
  article: [],
  offset: 0,
  limit: 10,
  articlesCount: 0,
  errors: null,
};

export default produce((state = defaultState, action) => {
  switch (action.type) {
    case INITUSERINFO:
      state.userInfo = action.data;
      saveToken(action.data.token);
      break;
    case USERERROR:
      state.errors = action.data;
      break;
    case CHANGEAPPNAV:
      state.navActive = action.data;
      break;
    case INITALLTAG:
      state.tags = action.data;
      break;
    case CHANGEHOMETAB:
      state.tab = action.data;
      break;
    case INITGLOBALARTICLESlIST:
      state.article = action.data.articles;
      state.articlesCount = action.data.articlesCount;
      break;
    case CHANGEGLOBALOFFSET:
      state.offset = action.data;
      break;

    default:
      return state;
  }
});
