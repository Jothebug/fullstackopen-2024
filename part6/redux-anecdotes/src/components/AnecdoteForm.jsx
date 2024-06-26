import { useDispatch } from "react-redux";
import { creatNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    dispatch(creatNewAnecdote({ content }));
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
