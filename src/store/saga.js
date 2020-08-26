import { saveToken, destroyToken } from "../utils";
import history from "../utils/history";

import { put, takeEvery } from "redux-saga/effects";
import {
  GETUSERINFO,
  USERLOGIN,
  USERREGISTER,
  GETALLTAG,
  GETGLOBALARTICLESlIST,
  GETARTICLEDETAILS,
  FOLLOW,
  UNFOLLOW,
  FAVORITRARTICLE,
  UNFAVORITRARTICLE,
  GETARTICLECOMMENTS,
  CREATEARTICLECOMMENTS,
  CHANGE_CURRENT_USER,
  CLEAN_USER_INFO,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  GET_PROFILES_USER,
} from "./actionTypes";
import {
  userError,
  initAllTag,
  initGlobalArticlesList,
  initUserInfo,
  initArticleDetails,
  updateArticleAuthor,
  initArticleComments,
  addArticleComments,
  cleanEditor,
  initProfilesUser
} from "./actionCreators";
import { User, Tags, Articles, Profile, Comments } from "../api";

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
      const action = initUserInfo(userInfo);
      yield put(action);
      saveToken(userInfo.token);
      history.push("/");
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
  userUpdate: function* (params) {
    try {
      const data = yield User.update(params.data),
        userInfo = data.user;
      yield put(initUserInfo(userInfo));
      yield put(userError([]));
      saveToken(userInfo.token);
      history.push("/");
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
  userLogout: function () {
    destroyToken();
    history.push("/");
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
  details: function* (params) {
    try {
      const fetchData = yield Articles.details(params.data);
      const action = initArticleDetails(fetchData.article);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  cretae: function* (params) {
    try {
      yield Articles.cretae(params.data);
      const action = cleanEditor();
      yield put(action);
      history.push("/");
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
  update: function* (params) {
    try {
      yield Articles.update(params.data);
      const action = cleanEditor();
      yield put(action);
      history.push("/");
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
};

const ProfileSaga = {
  follow: function* (params) {
    try {
      const fetchData = yield Profile.follow(params.data),
        author = fetchData.profile;
      const action = updateArticleAuthor(author);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  unFollow: function* (params) {
    try {
      const fetchData = yield Profile.unfollow(params.data),
        author = fetchData.profile;
      const action = updateArticleAuthor(author);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  favorite: function* (params) {
    try {
      const fetchData = yield Profile.favorite(params.data);
      const action = initArticleDetails(fetchData.article);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  unfavorite: function* (params) {
    try {
      const fetchData = yield Profile.unfavorite(params.data);
      const action = initArticleDetails(fetchData.article);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  get: function* (params) {
    try { 
      const fetchData = yield Profile.get(params.data);
      const action = initProfilesUser(fetchData.profile);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
};

const CommentsSaga = {
  forArticle: function* (params) {
    try {
      const fetchData = yield Comments.forArticle(params.data),
        comments = fetchData.comments;
      const action = initArticleComments(comments);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  },
  create: function* (params) {
    try {
      const fetchData = yield Comments.create(
          params.data.slug,
          params.data.data
        ),
        comments = fetchData.comment;
      const action = addArticleComments(comments);
      yield put(action);
      yield put(userError([]));
    } catch (e) {
      const action = userError(e.response.data.errors);
      yield put(action);
      console.error(e);
    }
  },
};

function* rootSaga() {
  yield takeEvery(GETUSERINFO, UserSaga.userInfo);
  yield takeEvery(USERLOGIN, UserSaga.userLogin);
  yield takeEvery(USERREGISTER, UserSaga.userRegister);
  yield takeEvery(CHANGE_CURRENT_USER, UserSaga.userUpdate);
  yield takeEvery(CLEAN_USER_INFO, UserSaga.userLogout);
  yield takeEvery(GETALLTAG, TagSaga.getTag);
  yield takeEvery(GETGLOBALARTICLESlIST, ArticleSaga.all);
  yield takeEvery(GETARTICLEDETAILS, ArticleSaga.details);
  yield takeEvery(CREATE_ARTICLE, ArticleSaga.cretae);
  yield takeEvery(UPDATE_ARTICLE, ArticleSaga.update);
  yield takeEvery(FOLLOW, ProfileSaga.follow);
  yield takeEvery(UNFOLLOW, ProfileSaga.unFollow);
  yield takeEvery(FAVORITRARTICLE, ProfileSaga.favorite);
  yield takeEvery(UNFAVORITRARTICLE, ProfileSaga.unfavorite);
  yield takeEvery(GETARTICLECOMMENTS, CommentsSaga.forArticle);
  yield takeEvery(CREATEARTICLECOMMENTS, CommentsSaga.create);
  yield takeEvery(GET_PROFILES_USER, ProfileSaga.get);
}

export default rootSaga;
