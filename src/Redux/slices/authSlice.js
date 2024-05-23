import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  appMode: "",
  credential: ""
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
    logout: (state) => {
      return initialState;
    }
  },
});

export const { setAuth, logout } = authSlice.actions;

const rootState = (state) => state;
export const authDataSelector = createSelector(rootState, (state) => state.auth);

export default authSlice.reducer;
