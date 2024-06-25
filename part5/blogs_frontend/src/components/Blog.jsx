import { memo, useCallback, useMemo, useState } from "react";

const Blog = ({ item = {}, user = {}, onLikeBlog, onRemoveBlog }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
  };
  const [isVisible, setIsVisible] = useState(false);
  const hideWhenVisible = { display: isVisible ? "none" : "" };
  const showWhenVisible = { display: isVisible ? "" : "none" };
  const onVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

  const [like, setLike] = useState(item.likes);
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
      onRemoveBlog?.({ blog: item });
    }
  }, [item, onRemoveBlog]);

  const showRemoveBtn = useMemo(
    () => item.user?.id === user?.id,
    [item?.user?.id, user?.id]
  );

  return (
    <div data-testid="blog" className="blog" style={blogStyle}>
      <div style={hideWhenVisible}>
        {item.title} by {item.author}
        <button
          onClick={onVisibility}
          data-testid="view-button"
          style={{ marginLeft: 8 }}
        >
          view
        </button>
      </div>

      <div style={showWhenVisible}>
        <div>
          {item.title} by {item.author}
          <button
            onClick={onVisibility}
            data-testid="hide-button"
            style={{ marginLeft: 8 }}
          >
            hide
          </button>
        </div>
        <p>{item.url}</p>
        <p>
          likes: {like} {"  "}
          <button
            data-testid="like-button"
            onClick={onLike}
            style={{ marginLeft: 8, marginRight: 8 }}
          >
            like
          </button>
          {showRemoveBtn && (
            <button
              onClick={onRemove}
              data-testid="remove-button"
              style={{
                background: "#4185F6",
                borderRadius: 5,
                borderWidth: 0,
                height: 22,
              }}
            >
              <text style={{ color: "white" }}>remove</text>
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default memo(Blog);
