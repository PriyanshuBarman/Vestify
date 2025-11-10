import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
