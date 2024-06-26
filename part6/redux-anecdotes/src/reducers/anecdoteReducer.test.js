import deepFreeze from "deep-freeze";
import reducer, { initialState } from "./anecdoteReducer";

describe("anecdote reducer", () => {
  test("vote is pressed", () => {
    const state = initialState;
    const action = { type: "VOTE", payload: { id: initialState[0].id } };

    deepFreeze(state);
    const newState = reducer(state, action);
    expect(newState[0]).toEqual({
      content: initialState[0].content,
      id: initialState[0].id,
      votes: 1,
    });
  });

  test("create a new anecdote", () => {
    const state = initialState;
    const action = {
      type: "CREATE",
      payload: { content: "My first line of code is not Hello World!" },
    };

    deepFreeze(state);
    const newState = reducer(state, action);
    const latestContent = newState[newState.length - 1]?.content;
    expect(latestContent).toEqual("My first line of code is not Hello World!");
  });
});
