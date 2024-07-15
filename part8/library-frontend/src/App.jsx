import { Route, Routes } from "react-router-dom";
import { Menu, Books, NewBook, Authors, Notification } from "./components";
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
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add-book"
          element={<NewBook handleNotify={handleNotify} />}
        />
      </Routes>
    </div>
  );
};

export default App;
