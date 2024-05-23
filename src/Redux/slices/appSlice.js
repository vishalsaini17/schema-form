import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeMode = action.payload;
    }
  },
});

export const { changeTheme } = appSlice.actions;

const rootState = (state) => state;
export const appDataSelector = createSelector(rootState, (state) => state.app);

export default appSlice.reducer;
