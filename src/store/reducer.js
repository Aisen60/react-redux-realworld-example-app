import { combineReducers } from "redux";
import common from "../reducer/common";
import auth from "../reducer/auth";
import home from "../reducer/home";

export default combineReducers({
  common,
  auth,
  home,
});
