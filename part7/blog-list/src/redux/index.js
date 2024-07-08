import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import blogsReducer from "../reducers/blogsReducer";
import authReducer from "../reducers/authReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: authReducer,
  },
});

export default store;
