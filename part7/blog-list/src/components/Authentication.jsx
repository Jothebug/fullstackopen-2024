import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { login, logout } from "../reducers/authReducer";
import { setNotification } from "../reducers/notificationReducer";

const Authentication = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const username = useField("username");
  const password = useField("password");

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const params = { username: username.value, password: password.value };
      await dispatch(login(params));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(setNotification({ message, type: "error" }));
    }
  };

  const onLogout = () => {
    dispatch(logout);
  };

  if (!user) {
    return (
      <>
        <h3>Log in to application</h3>
        <form onSubmit={onLogin}>
          <div>
            username <input {...username} />
          </div>
          <div>
            password <input {...password} />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  }

  return (
    <div>
      <p>
        {user.name} logged in{" "}
        <button type="button" onClick={onLogout}>
          logout
        </button>
      </p>
    </div>
  );
};
export default Authentication;
