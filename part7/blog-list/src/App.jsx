import { useState, useEffect } from "react";
import { Notification, Authentication } from "./components";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initialUser } from "./reducers/authReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      // await dispatch(initializeBlogs());
      dispatch(initialUser());
    })();
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      <Notification />
      <Authentication />
      {user && (
        <>
          <CreateBlog />
          <Blogs />
        </>
      )}
    </div>
  );
};

export default App;
