import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/authReducer";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="menu">
      <Link className="menu-item" to="/">
        Blogs
      </Link>
      <Link className="menu-item" to="/users">
        Users
      </Link>
      {user && (
        <>
          {user.name} logged in{" "}
          <button type="button" onClick={onLogout}>
            logout
          </button>
        </>
      )}
    </div>
  );
};

export default Menu;
