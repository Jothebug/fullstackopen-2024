import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import {
  Menu,
  Books,
  NewBook,
  Authors,
  Notification,
  Recommend,
} from "./components";
import { BOOK_ADDED } from "./services";

const App = () => {
  const [notify, setNotify] = useState({ message: "", type: "success" });

  const handleNotify = ({ message, type }) => {
    setNotify({ message, type });
    setTimeout(() => {
      setNotify({ message: "", type: "success" });
    }, 5000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data?.data?.bookAdded.title;
      if (addedBook) {
        alert(`${addedBook} added`);
      }
    },
  });

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
