import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const onVote = (id) => {
    dispatch(voteAnecdote(id));
  };

  if (anecdotes.length === 0) return null;

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote = {}) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
