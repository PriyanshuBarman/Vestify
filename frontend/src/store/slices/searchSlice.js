import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchHistory: {
    mutualFunds: [],
    indianStocks: [],
  },
  userSearchHistory: [],
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      const { item, type } = action.payload;
      const filtered = (state.searchHistory[type] || []).filter(
        (i) => i.name !== item.name,
      );

      state.searchHistory[type] = [item, ...filtered].slice(0, 6);
    },
    clearSearchHistory: (state, action) => {
      const { type } = action.payload;
      state.searchHistory[type] = [];
    },
    addUserSearchHistory: (state, action) => {
      const { profile } = action.payload;
      const filtered = (state.userSearchHistory || []).filter(
        (item) =>
          item.userId !== profile.userId && item.username !== profile.username,
      );

      state.userSearchHistory = [profile, ...filtered].slice(0, 6);
    },
    clearUserSearchHistory: (state, action) => {
      state.userSearchHistory = [];
    },
    setIsSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const {
  addToSearchHistory,
  clearSearchHistory,
  addUserSearchHistory,
  clearUserSearchHistory,
  setIsSearchOpen,
} = searchSlice.actions;

export default searchSlice.reducer;
