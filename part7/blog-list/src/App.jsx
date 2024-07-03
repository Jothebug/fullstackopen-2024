import { useState, useEffect } from "react";
import { Notification, Blog } from "./components";
import blogService from "./services/blogs";
import loginService from "./services/login";

const INIT_BLOG = { title: "", author: "", url: "" };
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [newBlog, setNewBlog] = useState(INIT_BLOG);
  const [notification, setNotification] = useState({
    type: "success",
    message: null,
  });
  const { username, password } = userInfo;

  const handleNotification = (data = {}) => {
    setNotification(data);
    setTimeout(() => {
      setNotification({ type: "success", message: null });
    }, 5000);
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await blogService.getAll();
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await loginService.login(userInfo);
      window.localStorage.setItem(
        "loggedBlogsappUser",
        JSON.stringify(res.data),
      );
      blogService.setToken(res.data.token);
      setUser(res.data || {});
      setUserInfo({ username: "", password: "" });
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogsappUser");
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const res = await blogService.createBlog(newBlog);
      handleNotification({
        type: "success",
        message: `a new blog ${res.title} by ${res.author} added`,
      });
      await fetchBlogs();
      setNewBlog(INIT_BLOG);
    } catch (error) {
      handleNotification({ type: "error", message: error.message });
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) =>
              setUserInfo((prev) => ({ ...prev, username: target.value }))
            }
          />
        </div>
        <div>
          password
          <input
            name="Password"
            type="password"
            value={password}
            onChange={({ target }) =>
              setUserInfo((prev) => ({ ...prev, password: target.value }))
            }
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const createBlogForm = () => {
    return (
      <div>
        <h3>Create new blog</h3>
        <form onSubmit={handleCreateBlog}>
          <div>
            title
            <input
              type="text"
              value={newBlog.title}
              name="title"
              onChange={({ target }) =>
                setNewBlog((prev) => ({ ...prev, title: target.value }))
              }
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={newBlog.author}
              name="author"
              onChange={({ target }) =>
                setNewBlog((prev) => ({ ...prev, author: target.value }))
              }
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={newBlog.url}
              name="url"
              onChange={({ target }) =>
                setNewBlog((prev) => ({ ...prev, url: target.value }))
              }
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <Notification {...notification} />
      <h2>{user === null ? "Log in to application" : "Blogs"}</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          {createBlogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
