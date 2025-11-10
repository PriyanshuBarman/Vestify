import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchHistory: {
    mutualFunds: [],
    indianStocks: [],
  },
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
    setIsSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { addToSearchHistory, clearSearchHistory, setIsSearchOpen } =
  searchSlice.actions;

export default searchSlice.reducer;
