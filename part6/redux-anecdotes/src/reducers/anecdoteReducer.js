import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id;
      const anecdote = state.find((as) => as.id === id) || {};
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state
        .map((item) => (item.id !== id ? item : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    creatNewAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, creatNewAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
