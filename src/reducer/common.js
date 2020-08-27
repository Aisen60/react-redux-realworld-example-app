import produce from "immer";
import { CHANGE_COMMON_NAV } from "../constants/actionTypes";
const initState = () => ({
  nav: "",
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_COMMON_NAV:
        draft.nav = action.payload.path;
        break;
      default:
        return draft;
    }
  });
