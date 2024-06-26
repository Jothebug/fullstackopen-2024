const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      let goodCounter = state.good;
      return { ...state, good: ++goodCounter };
    case "OK":
      let okCounter = state.ok;
      return { ...state, ok: ++okCounter };
    case "BAD":
      let badCounter = state.bad;
      return { ...state, bad: ++badCounter };
    case "ZERO":
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
