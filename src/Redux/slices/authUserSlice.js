import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  picture: "",
  given_name: "",
  family_name: "",
};

const authUserSlice = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      return action.payload;
    },
    resetAuthUser: (state, action)=>{
      return initialState;
    }
  },
});

export const { setAuthUser, resetAuthUser } = authUserSlice.actions;

const rootState = (state) => state;
export const authUserDataSelector = createSelector(rootState, (state) => state.authUser);

export default authUserSlice.reducer;
