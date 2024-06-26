import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { createNoti } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter.type === "ALL") {
      return state.anecdotes;
    }
    if (state.filter.type === "FILTER") {
      const filteredAnecdotes = state.anecdotes.filter(({ content } = {}) =>
        content.toLowerCase().includes(state.filter.payload.toLowerCase())
      );
      return filteredAnecdotes;
    }
  });

  const onVote = (anecdote) => {
    dispatch(voteAnecdote({ id: anecdote.id }));
    dispatch(createNoti({ content: anecdote.content }));
  };

  if (anecdotes.length === 0) return null;

  return (
    <>
      {anecdotes.map((anecdote = {}) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
