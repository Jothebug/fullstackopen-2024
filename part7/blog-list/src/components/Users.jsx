import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h3>Users</h3>
      {users.map((item = {}, index) => (
        <div className="users-list" key={`${item.id} ${index}`}>
          <div className="user-column">{item.username}</div>
          <div>{item.blogs.length}</div>
        </div>
      ))}
    </>
  );
};

export default Users;
