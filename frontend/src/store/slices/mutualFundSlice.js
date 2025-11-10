import { createSlice } from "@reduxjs/toolkit";

const defaultFilters = {
  plan: "GROWTH",
  sort_by: "popularity", // return_3y & fund_rating
  order_by: "desc",
  fund_rating_gte: "",
  fund_category: [],
  amc_name: [],
  crisil_rating: [],
};

const initialState = {
  activeTabIndex: 0,

  activeColumn: "return_3y",
  filters: defaultFilters,
};

const mutualFundSlice = createSlice({
  name: "mutualFund",
  initialState,
  reducers: {
    setActiveTabIndex: (state, action) => {
      state.activeTabIndex = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = defaultFilters;
    },
    setActiveColumn: (state, action) => {
      state.activeColumn = action.payload;
    },
  },
});

export const { setActiveTabIndex, setFilters, resetFilters, setActiveColumn } =
  mutualFundSlice.actions;

export const selectActiveTabIndex = (state) => state.mutualFund.activeTabIndex;
export const selectFilters = (state) => state.mutualFund.filters;
export const selectActiveColumn = (state) => state.mutualFund.activeColumn;

export default mutualFundSlice.reducer;
