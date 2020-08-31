import { all } from "redux-saga/effects";
import authSaga from "../saga/auth";
import homeSaga from "../saga/home";
import articleSaga from "../saga/article";
import editorSaga from "../saga/editor";
import profileSaga from "../saga/profile";

function* rootSaga() {
  yield all([
    authSaga(),
    homeSaga(),
    articleSaga(),
    editorSaga(),
    profileSaga(),
  ]);
}
export default rootSaga;
