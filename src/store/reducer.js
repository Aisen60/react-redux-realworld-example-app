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
  INITARTICLEDETAILS,
  UPDATEARTICLEAUTHOR,
  INITARTICLECOMMENTS,
  ADDARTICLECOMMENTS,
  CHANGE_CUTTENT_USER_TEXT,
  CLEAN_USER_INFO,
  CLEAN_EDITOR,
  SET_EDITOR,
  ADD_EDITOR_TAG,
  DELETE_EDITOR_TAG,
} from "./actionTypes";

const defaultState = {
  userInfo: {},
  currentUser: {},
  navActive: "Home",
  tags: [],
  tab: "Global",
  article: [],
  offset: 0,
  limit: 10,
  articlesCount: 0,
  errors: null,
  articleDetails: "",
  currentArticleComment: [],
  currentEditor: {
    title: "",
    body: "",
    description: "",
    tagList: [],
    tagValue: "",
  },
};

export default produce((state = defaultState, action) => {
  switch (action.type) {
    case INITUSERINFO:
      state.userInfo = action.data;
      state.currentUser = action.data;
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
    case INITARTICLEDETAILS:
      state.articleDetails = action.data;
      state.currentEditor = action.data;
      break;
    case UPDATEARTICLEAUTHOR:
      state.articleDetails.author = action.data;
      break;
    case INITARTICLECOMMENTS:
      state.currentArticleComment = action.data;
      break;
    case ADDARTICLECOMMENTS:
      state.currentArticleComment.unshift(action.data);
      break;
    case CHANGE_CUTTENT_USER_TEXT:
      state.currentUser = action.data;
      break;
    case CLEAN_USER_INFO:
      state.userInfo = {};
      state.currentUser = {};
      break;
    case CLEAN_EDITOR:
      state.currentEditor = {
        title: "",
        body: "",
        description: "",
        tagList: [],
        tagValue: "",
      };
      break;
    case SET_EDITOR:
      state.currentEditor = action.data;
      break;
    case ADD_EDITOR_TAG:
      state.currentEditor.tagList.push(action.data);
      state.currentEditor.tagValue = "";
      break;
    case DELETE_EDITOR_TAG:
      state.currentEditor.tagList.splice(action.data, 1);
      break;
    default:
      return state;
  }
});
