import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h3>Users</h3>
      {users.map((item = {}, index) => (
        <div className="users-list" key={`${item.id} ${index}`}>
          <Link className="user-column" to={`/users/${item.id}`}>
            {item.username}
          </Link>
          <div>{item.blogs.length}</div>
        </div>
      ))}
    </>
  );
};

export default Users;
