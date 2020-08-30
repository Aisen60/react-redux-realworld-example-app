import { put, takeEvery } from "redux-saga/effects";
import {
  GET_ARTICLE_DETAILS,
  INIT_ARTICLE_DETAILS,
  ARTICLE_FOLLOW_USER,
  ARTICLE_UNFOLLOW_USER,
  INIT_ARTICLE_DETAILS_USER,
  ARTICLE_FAVORITE,
  ARTICLE_UNFAVORITE,
  GET_ARTICLE_COMMENTS,
  INIT_ARTICLE_COMMENTS,
  CREATE_ARTICLE_COMMENTS,
  ADD_ARTICLE_COMMENTS,
  DELETE_ARTICLE_COMMENTS,
} from "../constants/actionTypes";
import api from "../services";

function* getArticleDetails(action) {
  try {
    const response = yield api.Articles.get(action.payload.slug),
      article = response.data.article;
    yield put({ type: INIT_ARTICLE_DETAILS, payload: { article } });
  } catch (e) {
    console.error(e);
  }
}

function* followUserOrUn(action) {
  let fn;
  if (action.type === ARTICLE_FOLLOW_USER) {
    fn = api.Profile.follow;
  }
  if (action.type === ARTICLE_UNFOLLOW_USER) {
    fn = api.Profile.unfollow;
  }
  try {
    const response = yield fn(action.payload.userName),
      profile = response.data.profile;
    yield put({ type: INIT_ARTICLE_DETAILS_USER, payload: { profile } });
  } catch (e) {
    console.error(e);
  }
}

function* favoriteArticleOrUn(action) {
  let fn;
  if (action.type === ARTICLE_FAVORITE) {
    fn = api.Articles.favorite;
  }
  if (action.type === ARTICLE_UNFAVORITE) {
    fn = api.Articles.unfavorite;
  }
  try {
    const response = yield fn(action.payload.slug),
      article = response.data.article;
    yield put({ type: INIT_ARTICLE_DETAILS, payload: { article } });
  } catch (e) {
    console.error(e);
  }
}

function* getArticleComments(action) {
  try {
    const response = yield api.Comments.forArticle(action.payload.slug),
      comments = response.data.comments;
    yield put({ type: INIT_ARTICLE_COMMENTS, payload: { comments } });
  } catch (e) {
    console.error(e);
  }
}

function* createArticleComments(action) {
  try {
    const response = yield api.Comments.create(
        action.payload.slug,
        action.payload.comment
      ),
      comment = response.data.comment;
    yield put({ type: ADD_ARTICLE_COMMENTS, payload: { comment } });
  } catch (e) {
    console.error(e);
  }
}

function* deleteArticleComments(action) {
  try {
    yield api.Comments.del(action.payload.slug, action.payload.commentId);
    debugger;
    yield getArticleComments(action);
  } catch (e) {
    console.error(e);
  }
}

function* articleSaga() {
  yield takeEvery(GET_ARTICLE_DETAILS, getArticleDetails);
  yield takeEvery(ARTICLE_FOLLOW_USER, followUserOrUn);
  yield takeEvery(ARTICLE_UNFOLLOW_USER, followUserOrUn);
  yield takeEvery(ARTICLE_FAVORITE, favoriteArticleOrUn);
  yield takeEvery(ARTICLE_UNFAVORITE, favoriteArticleOrUn);
  yield takeEvery(GET_ARTICLE_COMMENTS, getArticleComments);
  yield takeEvery(CREATE_ARTICLE_COMMENTS, createArticleComments);
  yield takeEvery(DELETE_ARTICLE_COMMENTS, deleteArticleComments);
}

export default articleSaga;
