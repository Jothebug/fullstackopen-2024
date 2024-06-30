import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "./services/requests";

import { Notification, AnecdoteForm, AnecdoteList } from "./components";

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
