import deepFreeze from "deep-freeze";
import anecdoteReducer, { initialState } from "./anecdoteReducer";

describe("anecdote reducer", () => {
  test("vote is pressed", () => {
    const state = initialState;
    const action = {
      type: "anecdotes/voteAnecdote",
      payload: { id: initialState[0].id },
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[0]).toEqual({
      content: initialState[0].content,
      id: initialState[0].id,
      votes: 1,
    });
  });

  test("create a new anecdote", () => {
    const state = initialState;
    const action = {
      type: "anecdotes/creatNewAnecdote",
      payload: { content: "My first line of code is not Hello World!" },
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    const latestContent = newState[newState.length - 1]?.content;
    expect(latestContent).toEqual("My first line of code is not Hello World!");
  });
});
