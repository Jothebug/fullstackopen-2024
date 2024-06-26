import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: "ALL" };
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter(_, action) {
      return {
        type: "FILTER",
        payload: action.payload.search,
      };
    },
  },
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
