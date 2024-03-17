import { useState, useEffect, useCallback, useRef } from "react";
import { Notification, CreateBlog, Toggle, Blogs } from "./components";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const toggleRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
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
        JSON.stringify(res.data)
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

  const toggleVisibility = useCallback(
    () => toggleRef.current?.onToggleVisibility(),
    []
  );

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

          <Toggle ref={toggleRef} label={"create new note"}>
            <CreateBlog
              onCreateBlog={onCreateBlog}
              onHideForm={toggleVisibility}
            />
          </Toggle>

          <Blogs style={{ marginTop: 8 }} data={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
