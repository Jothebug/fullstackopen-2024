import { useState, useEffect, useCallback, useRef } from "react";
import {
  Notification,
  CreateBlog,
  Toggle,
  Blogs,
  Authentication,
} from "./components";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { isEmpty } from "lodash";

const App = () => {
  const toggleRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState({
    type: "success",
    message: null,
  });

  const handleNotification = (data = {}) => {
    setNotification(data);
    setTimeout(() => {
      setNotification({ type: "success", message: null });
    }, 5000);
  };

  const fetchBlogs = async () => {
    try {
      const { data = [] } = await blogService.getAll();
      data.sort((a, b) => b.likes - a.likes);
      setBlogs(data);
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const onLogin = async ({ data }) => {
    try {
      const res = await loginService.login(data);
      window.localStorage.setItem(
        "loggedBlogsappUser",
        JSON.stringify(res.data)
      );
      blogService.setToken(res.data.token);
      setUser(res.data || {});
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  };

  const onLogout = () => {
    setUser({});
    window.localStorage.removeItem("loggedBlogsappUser");
  };

  const onCreateBlog = useCallback(async ({ data }) => {
    try {
      const res = await blogService.createBlog(data);
      handleNotification({
        type: "success",
        message: `a new blog ${res.title} by ${res.author} added`,
      });
      await fetchBlogs();
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  }, []);

  const onLikeBlog = useCallback(async ({ blog }) => {
    try {
      await blogService.updateBlog({ id: blog.id, data: blog });
      await fetchBlogs();
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  }, []);

  const toggleVisibility = useCallback(
    () => toggleRef.current?.onToggleVisibility(),
    []
  );

  return (
    <div>
      <Notification {...notification} />
      <Authentication
        user={user}
        onLogout={onLogout}
        onLogin={onLogin}
        style={{ marginBottom: 8 }}
      />
      {!isEmpty(user) && (
        <>
          <Toggle ref={toggleRef} label={"create new note"}>
            <CreateBlog
              onCreateBlog={onCreateBlog}
              onHideForm={toggleVisibility}
            />
          </Toggle>
          <Blogs
            data={blogs}
            style={{ marginTop: 8 }}
            onLikeBlog={onLikeBlog}
          />
        </>
      )}
    </div>
  );
};

export default App;
