import { combineReducers } from "redux";
import common from "../reducer/common";
import auth from "../reducer/auth";
import home from "../reducer/home";
import article from "../reducer/article";
import editor from "../reducer/editor";
import profile from "../reducer/profile";

export default combineReducers({
  common,
  auth,
  home,
  article,
  editor,
  profile,
});
