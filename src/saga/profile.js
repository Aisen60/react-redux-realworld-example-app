import { takeEvery, put } from "redux-saga/effects";
import {
  GET_USER_PROFILE,
  INIT_USER_PROFILE,
  GET_PROFILE_ARTICLE,
  GET_PROFILE_FAVORITED,
  INIT_PROFILE_ARTICLE,
  INIT_PROFILE_PAGE,
} from "../constants/actionTypes";
import api from "../services";

function* getProfiles(action) {
  try {
    const response = yield api.Profile.get(action.payload.userName),
      profile = response.data.profile;
    yield put({ type: INIT_USER_PROFILE, payload: { profile } });
  } catch (e) {
    console.error(e);
  }
}

function* getProfilesArticle(action) {
  const type = action.type,
    page = action.payload.page ? action.payload.page : 1;
  let fn;
  if (type === GET_PROFILE_ARTICLE) {
    fn = api.Articles.byAuthor;
  }

  if (type === GET_PROFILE_FAVORITED) {
    fn = api.Articles.favoritedBy;
  }
  try {
    const response = yield fn(action.payload.userName, page - 1),
      articles = response.data.articles,
      articlesCount = response.data.articlesCount;
    yield put({
      type: INIT_PROFILE_ARTICLE,
      payload: { articles, articlesCount },
    });
    yield put({
      type: INIT_PROFILE_PAGE,
      payload: { page },
    });
  } catch (e) {
    console.error(e);
  }
}

function* profilesSaga() {
  yield takeEvery(GET_USER_PROFILE, getProfiles);
  yield takeEvery(GET_PROFILE_ARTICLE, getProfilesArticle);
  yield takeEvery(GET_PROFILE_FAVORITED, getProfilesArticle);
}

export default profilesSaga;
