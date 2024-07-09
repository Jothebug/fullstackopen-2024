import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(_, action) {
      return action.payload;
    },
    clearNotification(_, action) {
      return action.payload;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification =
  ({ message = "", type = "success", timeout = 2000 }) =>
  (dispatch) => {
    dispatch(createNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification(""));
    }, timeout);
  };
