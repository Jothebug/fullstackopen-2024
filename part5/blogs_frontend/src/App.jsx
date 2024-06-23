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
  const [notification, setNotification] = useState({ message: null });

  const handleNotification = (data = {}) => {
    setNotification(data);

    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  const fetchBlogs = useCallback(async () => {
    try {
      const { data = [] } = await blogService.getAll();
      data.sort((a, b) => b.likes - a.likes);
      setBlogs(data);
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    const userJson = window.localStorage.getItem("@user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
    }
  }, []);

  const onLogin = async ({ data }) => {
    try {
      const res = await loginService.login(data);
      localStorage.setItem("@user", JSON.stringify(res));
      localStorage.setItem("@token", res.token);
      setUser(res || {});
    } catch (error) {
      handleNotification({
        type: "error",
        message: error.response.data.error,
      });
    }
  };

  const onLogout = () => {
    setUser({});
    localStorage.removeItem("@user");
    localStorage.removeItem("@token");
  };

  const onCreateBlog = useCallback(
    async ({ data }) => {
      try {
        const res = await blogService.createBlog(data);
        handleNotification({
          type: "success",
          message: `a new blog ${res.title} by ${res.author} added`,
        });
        await fetchBlogs();
      } catch (error) {
        console.log("error", error);
        handleNotification({ type: "error", message: error.message });
      }
    },
    [fetchBlogs]
  );

  const onLikeBlog = useCallback(
    async ({ blog }) => {
      try {
        await blogService.updateBlog({ id: blog.id, data: blog });
        handleNotification({
          type: "success",
          message: `${blog.title} by ${blog.author} removed`,
        });
        await fetchBlogs();
      } catch (error) {
        handleNotification({ type: "error", message: error.message });
      }
    },
    [fetchBlogs]
  );

  const onRemoveBlog = useCallback(
    async ({ blog }) => {
      try {
        await blogService.deleteBlog({ id: blog.id });
        await fetchBlogs();
      } catch (error) {
        handleNotification({
          type: "error",
          message: error.response.data.error,
        });
      }
    },
    [fetchBlogs]
  );

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
            onRemoveBlog={onRemoveBlog}
          />
        </>
      )}
    </div>
  );
};

export default App;
