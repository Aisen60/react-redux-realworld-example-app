import produce from "immer";
import { getToken } from "../utils";
import { AUTH_INIT, AUTH_ERRORS, AUTH_CLEAN } from "../constants/actionTypes";

const initState = () => ({
  jwToken: getToken(),
  userInfo: {},
  errors: [],
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AUTH_INIT:
        draft.userInfo = action.data;
        draft.jwToken = action.data.token;
        break;
      case AUTH_ERRORS:
        draft.errors = action.data;
        break;
      case AUTH_CLEAN:
        draft.jwToken = "";
        draft.userInfo = {};
        draft.errors = [];
        break;
      default:
        return draft;
    }
  });
