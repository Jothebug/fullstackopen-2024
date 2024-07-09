import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";

const CreateBlog = () => {
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
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title <input {...title} />
        </div>
        <div>
          author <input {...author} />
        </div>
        <div>
          url <input {...url} />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
