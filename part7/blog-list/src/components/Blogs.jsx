import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogsReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    (async () => {
      dispatch(initializeBlogs());
    })();
  }, []);

  return (
    <div>
      {blogs.map((blog, index) => (
        <div key={index}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  );
};
export default Blogs;
