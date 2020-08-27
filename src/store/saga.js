import { all } from "redux-saga/effects";
import authSaga from "../saga/auth";
import commonSaga from "../saga/common";

function* rootSaga() {
  yield all([authSaga(), commonSaga()]);
}
export default rootSaga;
