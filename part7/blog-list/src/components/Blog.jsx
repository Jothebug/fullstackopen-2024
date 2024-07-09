import { useState } from "react";

const Blog = ({ item = {}, onLikeBlog, onDeleteBlog }) => {
  const { id, author, title, url } = item;
  const [likes, setLikes] = useState(item.likes);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  const onLike = async () => {
    setLikes((prev) => {
      const newLike = prev + 1;
      const data = { author, title, url, likes: newLike };
      onLikeBlog?.({ id, data });
      return newLike;
    });
  };

  const onDelete = async () => {
    onDeleteBlog?.({ item });
  };

  return (
    <div style={style}>
      <div>
        {title} added by {author}
      </div>
      <div>{url}</div>
      <div>
        {likes} <button onClick={onLike}>like</button>
      </div>
      <div>
        <button onClick={onDelete}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
