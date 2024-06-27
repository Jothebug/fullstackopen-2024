import { useDispatch } from "react-redux";
import { creatNewAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    const data = await anecdoteService.create(content);
    dispatch(creatNewAnecdote(data));
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
