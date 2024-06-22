import { memo, useCallback, useState } from "react";

const INIT_BLOG = { title: "", author: "", url: "" };
const CreateBlog = ({ onCreateBlog, onHideForm }) => {
  const [newBlog, setNewBlog] = useState(INIT_BLOG);

  const handleCreate = useCallback(
    (event) => {
      event.preventDefault();
      onCreateBlog?.({ data: newBlog });
      setNewBlog(INIT_BLOG);
    },
    [newBlog, onCreateBlog]
  );

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={newBlog.title}
            name="title"
            placeholder="title"
            onChange={({ target }) =>
              setNewBlog((prev) => ({ ...prev, title: target.value }))
            }
          />
        </div>
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          author:
          <input
            data-testid="author"
            type="text"
            value={newBlog.author}
            name="author"
            placeholder="author"
            onChange={({ target }) =>
              setNewBlog((prev) => ({ ...prev, author: target.value }))
            }
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          url:
          <input
            data-testid="url"
            type="text"
            value={newBlog.url}
            name="url"
            placeholder="url"
            onChange={({ target }) =>
              setNewBlog((prev) => ({ ...prev, url: target.value }))
            }
          />
        </div>
        <div>
          <button type="submit">create</button>
          <button type="button" onClick={onHideForm}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CreateBlog);
