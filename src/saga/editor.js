import { takeEvery, put } from "redux-saga/effects";
import {
  GET_ARTICLE_DETAILS_NEW_POST,
  INIT_ARTICLE_DETAILS_NEW_POST,
  INIT_ARTICLE_ERRORS,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
} from "../constants/actionTypes";
import history from "../router/history";
import api from "../services";

function* getArticleDetails(action) {
  try {
    const response = yield api.Articles.get(action.payload.slug),
      article = response.data.article;
    yield put({ type: INIT_ARTICLE_DETAILS_NEW_POST, payload: { article } });
  } catch (e) {
    console.error(e);
  }
}

function* handleCreatedArticle(action) {
  try {
    yield api.Articles.create(action.payload.data);
    history.push("/");
  } catch (e) {
    const errors = e.response.data.errors;
    yield put({ type: INIT_ARTICLE_ERRORS, payload: { errors } });
    console.error(e);
  }
}

function* handleUpdateArticle(action) {
  try {
    yield api.Articles.update(action.payload.data);
    history.push("/");
  } catch (e) {
    const errors = e.response.data.errors;
    yield put({ type: INIT_ARTICLE_ERRORS, payload: { errors } });
    console.error(e);
  }
}

function* editorSaga() {
  yield takeEvery(GET_ARTICLE_DETAILS_NEW_POST, getArticleDetails);
  yield takeEvery(CREATE_ARTICLE, handleCreatedArticle);
  yield takeEvery(UPDATE_ARTICLE, handleUpdateArticle);
}

export default editorSaga;
