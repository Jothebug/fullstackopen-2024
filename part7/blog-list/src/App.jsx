import { useState, useEffect } from "react";
import {
  Notification,
  Authentication,
  Users,
  Menu,
  UserBlog,
  Blog,
} from "./components";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initialUser } from "./reducers/authReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { Route, Routes, useMatch } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      dispatch(initialUser());
      await Promise.allSettled([
        dispatch(initializeBlogs()),
        dispatch(initializeUsers()),
      ]);
    })();
  }, []);

  return (
    <div>
      <Menu />
      <Notification />
      {user ? (
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlog />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      ) : (
        <Authentication />
      )}
    </div>
  );
};

export default App;
