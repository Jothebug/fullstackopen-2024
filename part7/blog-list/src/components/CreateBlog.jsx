import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const title = useField("title");
  const author = useField("author");
  const url = useField("url");

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(newBlog));
    dispatch(setNotification(`new ${title.value} added`, 1000));
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <input {...title} />
        <input {...author} />
        <input {...url} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
