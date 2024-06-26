import {
  AnecdoteFilter,
  AnecdoteForm,
  AnecdoteList,
  Notification,
} from "./components";

const App = () => {
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
