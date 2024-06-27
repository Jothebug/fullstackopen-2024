import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNoti(_, action) {
      return action.payload;
    },
    clearNoti(_, action) {
      return action.payload;
    },
  },
});

export const { createNoti, clearNoti } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification =
  (content = "", timeout = 100) =>
  (dispatch) => {
    dispatch(createNoti(content));
    setTimeout(() => {
      dispatch(clearNoti(""));
    }, timeout);
  };
