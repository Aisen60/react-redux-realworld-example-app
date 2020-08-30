import produce from "immer";
import {
  INIT_ARTICLE_ERRORS,
  INIT_ARTICLE_DETAILS_NEW_POST,
} from "../constants/actionTypes";
const initState = () => ({
  article: {},
  errors: "",
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT_ARTICLE_DETAILS_NEW_POST:
        draft.article = action.payload.article;
        break;
      case INIT_ARTICLE_ERRORS:
        draft.errors = action.payload.errors;
        break;
      default:
        return draft;
    }
  });
