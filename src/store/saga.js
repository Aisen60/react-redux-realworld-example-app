import { saveToken } from "../utils";
import history from "../utils/history";

import { put, takeEvery } from "redux-saga/effects";
import {
  GETUSERINFO,
  USERLOGIN,
  USERREGISTER,
  GETALLTAG,
  GETGLOBALARTICLESlIST,
} from "./actionTypes";
import {
  userError,
  initAllTag,
  initGlobalArticlesList,
  initUserInfo,
} from "./actionCreators";
import { User, Tags, Articles } from "../api";

const UserSaga = {
  userInfo: function* () {
    try {
      const data = yield User.current(),
        userInfo = data.user;
      const action = initUserInfo(userInfo);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  userLogin: function* (params) {
    try {
      const data = yield User.login(params.data),
        userInfo = data.user;
      saveToken(userInfo.token);
      history.push("/");
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
  userRegister: function* (params) {
    try {
      const data = yield User.register(params.data),
        userInfo = data.user;
      saveToken(userInfo.token);
      history.push("/");
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
};

const TagSaga = {
  getTag: function* () {
    try {
      const fetchData = yield Tags.getAll(),
        tags = fetchData.tags;
      const action = initAllTag(tags);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
};

const ArticleSaga = {
  all: function* (params) {
    try {
      const fetchData = yield Articles.all(params.data);
      const action = initGlobalArticlesList(fetchData);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
};

function* rootSaga() {
  yield takeEvery(GETUSERINFO, UserSaga.userInfo);
  yield takeEvery(USERLOGIN, UserSaga.userLogin);
  yield takeEvery(USERREGISTER, UserSaga.userRegister);
  yield takeEvery(GETALLTAG, TagSaga.getTag);
  yield takeEvery(GETGLOBALARTICLESlIST, ArticleSaga.all);
}

export default rootSaga;
