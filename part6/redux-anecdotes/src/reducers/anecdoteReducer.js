import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(_, action) {
      return action.payload;
    },
    create(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

export const { vote, create, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNew = (content) => async (dispatch) => {
  const data = await anecdoteService.create(content);
  dispatch(create(data));
};

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const anecdotes = getState().anecdotes;

  const anecdote = anecdotes.find((item) => item.id === id) || {};
  const updatedList = anecdotes
    .map((item) =>
      item.id !== id ? item : { ...anecdote, votes: anecdote.votes + 1 }
    )
    .sort((a, b) => b.votes - a.votes);

  dispatch(vote(updatedList));
};
