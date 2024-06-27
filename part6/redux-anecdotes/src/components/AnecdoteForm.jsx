import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    dispatch(createNew(content));
    dispatch(setNotification(`new ${content} added`, 1000));
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="note" />
        <button type="submit">create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
