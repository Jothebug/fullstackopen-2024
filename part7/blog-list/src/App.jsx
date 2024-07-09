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
      dispatch(initialUser());
      await dispatch(initializeBlogs());
    })();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Authentication />
      {user && (
        <>
          <Blogs />
          <CreateBlog />
        </>
      )}
    </div>
  );
};

export default App;
