import { useState, useEffect } from "react";
import { Notification, Blog, AuthenForm } from "./components";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  // const [user, setUser] = useState(null);
  // const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  // const [newBlog, setNewBlog] = useState(INIT_BLOG);
  // const { username, password } = userInfo;

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

  // const loginForm = () => {
  //   return (
  //     <form onSubmit={handleLogin}>
  //       <div>
  //         username
  //         <input
  //           type="text"
  //           value={username}
  //           name="Username"
  //           onChange={({ target }) =>
  //             setUserInfo((prev) => ({ ...prev, username: target.value }))
  //           }
  //         />
  //       </div>
  //       <div>
  //         password
  //         <input
  //           name="Password"
  //           type="password"
  //           value={password}
  //           onChange={({ target }) =>
  //             setUserInfo((prev) => ({ ...prev, password: target.value }))
  //           }
  //         />
  //       </div>
  //       <button type="submit">login</button>
  //     </form>
  //   );
  // };

  return (
    <div>
      <h2>Blog List</h2>
      <Notification />
      <User />
      <AuthenForm />
      <CreateBlog />
      <Blogs />
      {/* <h2>{user === null ? "Log in to application" : "Blogs"}</h2>
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
          <CreateBlog />
          <Blogs />
        </div>
      )} */}
    </div>
  );
};

export default App;
