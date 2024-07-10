import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { useCallback } from "react";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const onLikeBlog = useCallback(async ({ id, data }) => {
    try {
      await dispatch(updateBlog({ id, data }));
      dispatch(
        setNotification({
          message: `${data.title} by ${data.author} liked!`,
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          message: `${error.message}`,
        }),
      );
    }
  }, []);

  const onDeleteBlog = useCallback(async ({ item }) => {
    try {
      await dispatch(deleteBlog({ id: item.id }));
      dispatch(
        setNotification({
          message: `Delete ${item.title} successfully`,
        }),
      );
    } catch (error) {
      const message = error?.response?.data?.error || "";
      dispatch(setNotification({ type: "error", message }));
    }
  }, []);

  return (
    <>
      <h3>The list of blog</h3>
      {blogs.map((blog, index) => (
        <Blog
          item={blog}
          key={index}
          onLikeBlog={onLikeBlog}
          onDeleteBlog={onDeleteBlog}
        />
      ))}
    </>
  );
};
export default Blogs;
