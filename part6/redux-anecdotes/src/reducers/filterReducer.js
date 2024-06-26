export const filter = (search) => {
  return {
    type: "FILTER",
    payload: search,
  };
};

const initialState = { type: "ALL" };

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return {
        type: "FILTER",
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
