import { put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_TAGS,
  INIT_ALL_TAGS,
  GET_HOME_ARTICLE_LIST,
  INIT_HOME_ARTICLE_LIST,
  INIT_HOME_PAGE,
} from "../constants/actionTypes";
import { YOUR_FEED, GLOBAL_FEED } from "../config";
import api from "../services";

function* getAllTags() {
  try {
    const response = yield api.Tags.getAll(),
      tags = response.data.tags;
    yield put({ type: INIT_ALL_TAGS, payload: { tags } });
  } catch (e) {
    console.error(e);
  }
}

function* getArticleList(params) {
  const type = params.payload.tab,
    page = params.payload.page ? params.payload.page : 1;
  let fn;
  if (type === YOUR_FEED) {
    fn = api.Articles.feed;
  }

  if (type === GLOBAL_FEED) {
    fn = api.Articles.all;
  }

  try {
    const response = yield fn(page - 1),
      data = response.data;
    yield put({ type: INIT_HOME_ARTICLE_LIST, payload: { data } });
    yield put({ type: INIT_HOME_PAGE, payload: { page } });
  } catch (e) {
    console.error(e);
  }
}

function* homeSaga() {
  yield takeEvery(GET_ALL_TAGS, getAllTags);
  yield takeEvery(GET_HOME_ARTICLE_LIST, getArticleList);
}

export default homeSaga;
