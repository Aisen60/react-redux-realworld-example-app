import produce from "immer";
import {
  INIT_USER_PROFILE,
  INIT_PROFILE_ARTICLE,
} from "../constants/actionTypes";
const initState = () => ({
  profile: {},
  page: 1,
  limit: 5,
  count: 0,
  list: [],
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT_USER_PROFILE:
        draft.profile = action.payload.profile;
        break;
      case INIT_PROFILE_ARTICLE:
        draft.list = action.payload.articles;
        draft.count = action.payload.articlesCount;
        break;
      default:
        return draft;
    }
  });
