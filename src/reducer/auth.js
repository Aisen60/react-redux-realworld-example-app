import produce from "immer";
import { getToken } from "../utils";

const initState = () => ({
  jwToken: getToken(),
  userInfo: {},
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        return draft;
    }
  });
