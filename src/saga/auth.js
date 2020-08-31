import { put, takeEvery } from "redux-saga/effects";
import { saveToken } from "../utils";
import history from "../router/history";
import {
  AUTH_CURRENT,
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_INIT,
  AUTH_ERRORS,
  AUTH_CLEAN,
  AUTH_SAVE,
} from "../constants/actionTypes";
import api from "../services";

function* setAuthError(data) {
  yield put({ type: AUTH_ERRORS, data });
}

function* authLogin(params) {
  try {
    const response = yield api.Auth.login(
        params.payload.email,
        params.payload.password
      ),
      userInfo = response.data.user;
    yield put({ type: AUTH_CLEAN });
    yield put({ type: AUTH_INIT, data: userInfo });
    yield setAuthError([]);
    yield saveToken(userInfo.token);
    yield history.push("/");
  } catch (e) {
    yield setAuthError(e.response.data.errors);
    console.error(e);
  }
}

function* authRegistry(params) {
  try {
    const response = yield api.Auth.register(
        params.payload.username,
        params.payload.email,
        params.payload.password
      ),
      userInfo = response.data.user;
    yield put({ type: AUTH_CLEAN });
    yield put({ type: AUTH_INIT, data: userInfo });
    saveToken(userInfo.token);
    yield setAuthError([]);
    history.push("/");
  } catch (e) {
    yield setAuthError(e.response.data.errors);
    console.error(e);
  }
}

function* authCurrent() {
  try {
    const response = yield api.Auth.current(),
      userInfo = response.data.user;
    yield put({ type: AUTH_INIT, data: userInfo });
    saveToken(userInfo.token);
  } catch (e) {
    console.error(e);
  }
}

function* authSave(params) {
  try {
    const response = yield api.Auth.save(params.payload.user),
      userInfo = response.data.user;
    yield put({ type: AUTH_INIT, data: userInfo });
    saveToken(userInfo.token);
    yield setAuthError([]);
    history.push("/");
  } catch (e) {
    yield setAuthError(e.response.data.errors);
    console.error(e);
  }
}

function* authSaga() {
  yield takeEvery(AUTH_LOGIN, authLogin);
  yield takeEvery(AUTH_REGISTER, authRegistry);
  yield takeEvery(AUTH_CURRENT, authCurrent);
  yield takeEvery(AUTH_SAVE, authSave);
}

export default authSaga;
