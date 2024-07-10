import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { useCallback, useState } from "react";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import CreateBlog from "./CreateBlog";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [isVisibleForm, setVisibleForm] = useState(false);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  return (
    <div>
      <h3>
        The list of blog{" "}
        <button type="button" onClick={() => setVisibleForm(true)}>
          create
        </button>
      </h3>
      {isVisibleForm && <CreateBlog onCancel={() => setVisibleForm(false)} />}
      {blogs.map((item, index) => (
        <div style={style}>
          <Link key={index} to={`/blogs/${item.id}`}>
            {item.title} added by {item.author}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Blogs;
