import { createSlice } from "@reduxjs/toolkit";
import dummydata from "../data";
const userSlice = createSlice({
  name: "users",
  initialState: { users: dummydata },
  reducers: {
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice;
