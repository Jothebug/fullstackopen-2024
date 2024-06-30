import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/requests";
import { useNotification } from "../context/Notifcation";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: (newAnecdote) => {
      if (newAnecdote.content.length > 5) {
        return createAnecdote(newAnecdote);
      } else {
        return Promise.reject({
          message:
            "The content of the anecdote must be at least 5 characters long",
        });
      }
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({
        type: "SHOW",
        message: "New anecdote created!",
      });
    },
    onError: (error) => {
      dispatch({
        type: "SHOW",
        message: error.message,
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
