import { memo, useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";

const Authentication = ({ user = {}, onLogin, onLogout, style }) => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  Authentication.prototype = {
    user: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      onLogin?.({ data: userInfo });
      setUserInfo({ username: "", password: "" });
    },
    [onLogin, userInfo]
  );

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
              data-testid="username"
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
              data-testid="password"
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
