import { all } from "redux-saga/effects";
import authSaga from "../saga/auth";
import commonSaga from "../saga/common";
import homeSaga from "../saga/home";
import articleSaga from "../saga/article";
import editorSaga from "../saga/editor";
import profileSaga from "../saga/profile";

function* rootSaga() {
  yield all([
    authSaga(),
    commonSaga(),
    homeSaga(),
    articleSaga(),
    editorSaga(),
    profileSaga(),
  ]);
}
export default rootSaga;
