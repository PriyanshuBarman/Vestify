import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: "updatedAt",
  expandedCardIndex: -1,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleExpandedCardIndex: (state, action) => {
      const index = action.payload;
      state.expandedCardIndex = state.expandedCardIndex === index ? -1 : index;
    },
  },
});

export const { setSortBy, toggleExpandedCardIndex } = communitySlice.actions;

export const selectSortBy = (state) => state.community.sortBy;
export const selectExpandedCardIndex = (state) =>
  state.community.expandedCardIndex;

export default communitySlice.reducer;
