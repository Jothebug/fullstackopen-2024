import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

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

export const { create, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog =
  (newBlog = {}) =>
  async (dispatch) => {
    const data = await blogsService.createBlog(newBlog);
    dispatch(create(data));
  };
