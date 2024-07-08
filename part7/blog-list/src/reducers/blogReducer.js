import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    create(_, action) {
      return action.payload;
    },
    setBlogs(_, action) {
      return action.payload;
    },
  },
});

export const { create, getAll } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog =
  (newBlog = {}) =>
  async (dispatch) => {
    const data = await blogService.createBlog(newBlog);
    dispatch(create(data));
  };
