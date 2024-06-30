import { useQuery } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";

import { getAnecdotes } from "./services/requests";

const App = () => {
  const { isPending, isError, data, error, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (isLoading || isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Anecdote app</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={data} />
    </div>
  );
};

export default App;
