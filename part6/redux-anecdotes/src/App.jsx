import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AnecdoteFilter,
  AnecdoteForm,
  AnecdoteList,
  Notification,
} from "./components";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
