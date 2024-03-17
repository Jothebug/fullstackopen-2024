import { memo, useCallback, useMemo, useState } from "react";

const Blog = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);

  const titleButton = useMemo(() => (isVisible ? "hide" : "show"), [isVisible]);

  const onToggle = useCallback(() => setIsVisible((prev) => !prev), []);

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
          <div>likes: {item.likes}</div>
          <div>author: {item.author}</div>
        </>
      )}
    </div>
  );
};

export default memo(Blog);
