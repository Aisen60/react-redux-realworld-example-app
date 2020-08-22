import { saveToken } from "../utils";
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
  details: function* (params) {
    try {
      const fetchData = yield Articles.details(params.data);
      const action = initArticleDetails(fetchData.article);
      yield put(action);
    } catch (e) {
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
  yield takeEvery(GETALLTAG, TagSaga.getTag);
  yield takeEvery(GETGLOBALARTICLESlIST, ArticleSaga.all);
  yield takeEvery(GETARTICLEDETAILS, ArticleSaga.details);
  yield takeEvery(FOLLOW, ProfileSaga.follow);
  yield takeEvery(UNFOLLOW, ProfileSaga.unFollow);
  yield takeEvery(FAVORITRARTICLE, ProfileSaga.favorite);
  yield takeEvery(UNFAVORITRARTICLE, ProfileSaga.unfavorite);
  yield takeEvery(GETARTICLECOMMENTS, CommentsSaga.forArticle);
  yield takeEvery(CREATEARTICLECOMMENTS, CommentsSaga.create);
}

export default rootSaga;
