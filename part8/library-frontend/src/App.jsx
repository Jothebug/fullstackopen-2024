import { Route, Routes } from "react-router-dom";
import { Menu, Books, NewBook, Authors } from "./components";

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
