import produce from "immer";
import {
  INIT_ARTICLE_DETAILS,
  INIT_ARTICLE_DETAILS_USER,
  INIT_ARTICLE_COMMENTS,
  ADD_ARTICLE_COMMENTS,
} from "../constants/actionTypes";

const initState = () => ({
  article: {},
  comments: [],
  errors: [],
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT_ARTICLE_DETAILS:
        draft.article = action.payload.article;
        break;
      case INIT_ARTICLE_DETAILS_USER:
        draft.article.author = action.payload.profile;
        break;
      case INIT_ARTICLE_COMMENTS:
        draft.comments = action.payload.comments;
        break;
      case ADD_ARTICLE_COMMENTS:
        draft.comments.unshift(action.payload.comment);
        break;
      default:
        return draft;
    }
  });
