import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";

const Form = ({ label, value }) => {
  return (
    <div className="users-list form">
      <div className="label-column">{label}</div>
      <input {...value} />
    </div>
  );
};

const CreateBlog = ({ onCancel }) => {
  const dispatch = useDispatch();
  const title = useField("title");
  const author = useField("author");
  const url = useField("url");

  const onClearInput = () => {
    title.onClear();
    author.onClear();
    url.onClear();
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(newBlog));
    onClearInput();
    dispatch(
      setNotification({ message: `new ${title.value} added`, type: "success" }),
    );
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <Form label={"title"} value={title} />
        <Form label={"author"} value={author} />
        <Form label={"url"} value={url} />
        <div>
          <button style={{ marginRight: 10 }} type="submit">
            confirm
          </button>
          <button type="button" onClick={onCancel}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
