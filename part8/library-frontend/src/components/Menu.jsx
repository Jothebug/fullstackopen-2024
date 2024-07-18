import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link className="menu-item" to="/">
        Authors
      </Link>
      <Link className="menu-item" to="/books">
        Books
      </Link>
      <Link className="menu-item" to="/add-book">
        Add book
      </Link>
      <Link className="menu-item" to="/recommend">
        Recommend
      </Link>
    </div>
  );
};

export default Menu;
