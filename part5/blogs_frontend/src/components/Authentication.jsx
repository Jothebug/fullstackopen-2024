import { memo, useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";

const Authentication = ({ user = {}, onLogin, onLogout, style }) => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleLogin = useCallback((event) => {
    event.preventDefault();
    onLogin?.({ data: userInfo });
    setUserInfo({ username: "", password: "" });
  }, []);

  const { showLogin, showLogout } = useMemo(() => {
    const showLogin = { display: isEmpty(user) ? "" : "none" };
    const showLogout = { display: !isEmpty(user) ? "" : "none" };

    return { showLogin, showLogout };
  }, [user]);

  return (
    <div style={style}>
      <div style={showLogin}>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              value={userInfo.username}
              name="Username"
              onChange={({ target }) =>
                setUserInfo((prev) => ({ ...prev, username: target.value }))
              }
            />
          </div>
          <div>
            password{" "}
            <input
              name="Password"
              type="password"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo((prev) => ({ ...prev, password: target.value }))
              }
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      <div style={showLogout}>
        <h2>Blogs</h2>
        <div>
          <p>{user.name} logged in</p>
          <button onClick={onLogout}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default memo(Authentication);
