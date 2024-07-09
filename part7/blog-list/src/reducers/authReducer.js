import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const authSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    authen(_, action) {
      return action.payload;
    },
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { authen, setUser } = authSlice.actions;
export default authSlice.reducer;

export const initialUser = () => (dispatch) => {
  const userJson = window.localStorage.getItem("@USER");
  const user = JSON.parse(userJson);
  if (user) {
    dispatch(setUser(user));
  }
};

export const login =
  (data = {}) =>
  async (dispatch) => {
    const res = await loginService.login(data);
    if (res) {
      window.localStorage.setItem("@USER", JSON.stringify(res));
      window.localStorage.setItem("@TOKEN", res.token);
      dispatch(setUser(res));
    }
  };

export const logout = () => (dispatch) => {
  window.localStorage.removeItem("@USER");
  window.localStorage.removeItem("@TOKEN");
  dispatch(setUser(null));
};
