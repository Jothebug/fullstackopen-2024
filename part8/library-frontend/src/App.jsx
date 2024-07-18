import { Route, Routes } from "react-router-dom";
import {
  Menu,
  Books,
  NewBook,
  Authors,
  Notification,
  Recommend,
} from "./components";
import { useState } from "react";

const App = () => {
  const [notify, setNotify] = useState({ message: "", type: "success" });

  const handleNotify = ({ message, type }) => {
    setNotify({ message, type });
    setTimeout(() => {
      setNotify({ message: "", type: "success" });
    }, 5000);
  };

  return (
    <div>
      <Menu />
      <Notification {...notify} />
      <Routes>
        <Route path="/" element={<Authors handleNotify={handleNotify} />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add-book"
          element={<NewBook handleNotify={handleNotify} />}
        />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </div>
  );
};

export default App;
