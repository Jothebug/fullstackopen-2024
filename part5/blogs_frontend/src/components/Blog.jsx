import { memo, useCallback, useMemo, useState } from "react";

const Blog = ({ item, onLikeBlog, onRemoveBlog }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [like, setLike] = useState(item.likes || 0);
  const titleButton = useMemo(() => (isVisible ? "hide" : "view"), [isVisible]);
  const onToggle = useCallback(() => setIsVisible((prev) => !prev), []);

  const onLike = useCallback(() => {
    setLike((prev) => {
      const newLike = prev + 1;
      const blog = { ...item, likes: newLike };
      onLikeBlog?.({ blog });
      return newLike;
    });
  }, [item, onLikeBlog]);

  const onRemove = useCallback(() => {
    if (window.confirm(`Remove blog ${item.title}! by ${item.author}`)) {
      console.log("onRemoveBlog");
      onRemoveBlog?.({ blog: item });
    }
  }, [item, onRemoveBlog]);

  return (
    <div
      className="blog"
      style={{ border: "solid", borderWidth: 1, marginBottom: 8, padding: 8 }}
    >
      <div>
        {item.title}
        <button type="button" onClick={onToggle} style={{ marginLeft: 8 }}>
          {titleButton}
        </button>
      </div>
      {isVisible && (
        <>
          <div> url: {item.url}</div>
          <div>
            likes: {like} <button onClick={onLike}>like</button>
          </div>
          <div>author: {item.author}</div>
          <button
            onClick={onRemove}
            style={{
              background: "#4185F6",
              borderRadius: 5,
              borderWidth: 0,
              height: 22,
            }}
          >
            <text style={{ color: "white" }}>remove</text>
          </button>
        </>
      )}
    </div>
  );
};

export default memo(Blog);
