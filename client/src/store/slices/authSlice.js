import { createSlice } from "@reduxjs/toolkit";
import { getParsedUserData } from "../../utils/common";

const initialState = {
  me: getParsedUserData() || null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateMe: (state, action) => {
      state.me = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Action
export const { updateMe, updateUsers } = authSlice.actions;

// Getters
export const getMeAuthState = (state) => state.auth.me;
export const getUsersAuthState = (state) => state.auth.users;

export default authSlice.reducer;
