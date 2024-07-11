import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const match = useMatch("/blogs/:id");
  const blog = blogs.find(({ id }) => id === match.params.id);
  const { id, author, title, url, likes = 0, comments = [] } = blog || {};

  const [countLikes, setLikes] = useState(likes);
  const _comment = useField("comment");

  const onLikeBlog = async ({ data }) => {
    try {
      await dispatch(updateBlog({ id, data }));
      dispatch(
        setNotification({
          message: `${title} by ${author} liked!`,
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
  };

  const onLike = async () => {
    setLikes((prev) => {
      const newLike = prev + 1;
      const data = { author, title, url, likes: newLike };
      onLikeBlog({ data });
      return newLike;
    });
  };

  const onDeleteBlog = async () => {
    try {
      await dispatch(deleteBlog({ id }));
      dispatch(
        setNotification({
          message: `Delete ${title} successfully`,
        }),
      );
    } catch (error) {
      const message = error?.response?.data?.error || "";
      dispatch(setNotification({ type: "error", message }));
    }
  };

  const onAddComment = async () => {
    try {
      const data = { comment: _comment.value };
      await dispatch(updateBlog({ id, data }));
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          message: `${error.message}`,
        }),
      );
    }
  };

  if (!blog) return <div>Not found</div>;

  return (
    <div>
      <h3>
        {title} added by {author}
      </h3>
      <a href={url}>{url}</a>
      <div style={{ marginTop: 10 }}>
        {countLikes}
        <button style={{ marginRight: 8, marginLeft: 8 }} onClick={onLike}>
          like
        </button>
        <button onClick={onDeleteBlog}>delete</button>
      </div>

      <div>
        <h4>comments</h4>
        <form className="users-list form" onSubmit={onAddComment}>
          <input {..._comment} />
          <button type="submit">add comment</button>
        </form>
        {comments.length > 0 ? (
          <ul>
            {comments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
