import { memo, useCallback, useMemo, useState } from "react";

const Blog = ({ item, onLikeBlog }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [like, setLike] = useState(item.likes || 0);
  const titleButton = useMemo(() => (isVisible ? "hide" : "show"), [isVisible]);
  const onToggle = useCallback(() => setIsVisible((prev) => !prev), []);

  const onClick = useCallback(() => {
    setLike((prev) => {
      const newLike = prev + 1;
      const blog = { ...item, likes: newLike };
      onLikeBlog?.({ blog });
      return newLike;
    });
  }, [item, onLikeBlog]);

  return (
    <div
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
            likes: {like} <button onClick={onClick}>like</button>
          </div>
          <div>author: {item.author}</div>
        </>
      )}
    </div>
  );
};

export default memo(Blog);
