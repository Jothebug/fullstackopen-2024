import { memo } from "react";
import Blog from "./Blog";

const Blogs = ({ data = [], style, onLikeBlog, onRemoveBlog }) => {
  if (data.length === 0) return null;

  return (
    <div style={style}>
      {data.map((item, index) => (
        <Blog
          key={`${item.id}${index}`}
          item={item}
          onLikeBlog={onLikeBlog}
          onRemoveBlog={onRemoveBlog}
        />
      ))}
    </div>
  );
};

export default memo(Blogs);
