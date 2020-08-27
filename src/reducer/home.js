import produce from "immer";

const initState = () => ({
  tags: [],
});

export default (state = initState(), action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 1:
        break;
      default:
        return state;
    }
  });
