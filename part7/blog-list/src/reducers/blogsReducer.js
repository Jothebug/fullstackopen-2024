import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog =
  (newBlog = {}) =>
  async (dispatch, getState) => {
    const blogs = getState().blogs;
    const data = await blogsService.createBlog(newBlog);
    if (data) {
      const updatedBlogs = [...blogs, data];
      dispatch(setBlogs(updatedBlogs));
    }
  };

export const updateBlog =
  ({ id, data = {} }) =>
  async (dispatch) => {
    const res = await blogsService.updateBlog({ id, data });
    if (res) {
      await dispatch(initializeBlogs());
    }
  };

export const deleteBlog =
  ({ id }) =>
  async (dispatch, getState) => {
    const blogs = getState().blogs;
    await blogsService.deleteBlog({ id });
    const newBlogs = blogs.filter((i) => i.id !== id);
    dispatch(setBlogs(newBlogs));
  };
