import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.user);
  if (!user) return null;

  return (
    <div>
      <p>
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
    </div>
  );
};

export default User;
