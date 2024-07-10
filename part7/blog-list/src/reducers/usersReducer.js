import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getUsers();
  dispatch(setUsers(users));
};
