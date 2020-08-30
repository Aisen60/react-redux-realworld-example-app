import produce from "immer";
import { getToken } from "../utils";

import {
  INIT_ALL_TAGS,
  INIT_HOME_ARTICLE_LIST,
  INIT_HOME_PAGE,
  CHANGE_HOME_TAB,
} from "../constants/actionTypes";

const initState = () => ({
  tags: [],
  tab: getToken() ? "Your Feed" : "Global Feed",
  list: [],
  page: 1,
  count: 0,
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT_ALL_TAGS:
        draft.tags = action.payload.tags;
        break;
      case INIT_HOME_ARTICLE_LIST:
        draft.list = action.payload.data.articles;
        draft.count = action.payload.data.articlesCount;
        break;
      case INIT_HOME_PAGE:
        draft.page = action.payload.page;
        break;
      case CHANGE_HOME_TAB:
        draft.tab = action.payload.tab;
        break;
      default:
        return state;
    }
  });
