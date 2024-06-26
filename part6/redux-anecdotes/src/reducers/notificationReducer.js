import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNoti(_, action) {
      return action.payload.content;
    },
  },
});

export const { createNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
