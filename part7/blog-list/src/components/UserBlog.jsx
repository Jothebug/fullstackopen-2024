import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const UserBlog = () => {
  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  const user = users.find(({ id }) => id === match.params.id);
  const data = user.blogs ?? [];
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      {data.length > 0 ? (
        <ul>
          {data.map((item = {}, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};
export default UserBlog;
