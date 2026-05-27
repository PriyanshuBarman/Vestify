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
  recentlyViewedFunds: [],
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
    setRecentlyViewedFunds: (state, action) => {
      const fund = action.payload;
      if (!fund?.scheme_code) return;

      const filtered = (state.recentlyViewedFunds || []).filter(
        (item) => item.scheme_code !== fund.scheme_code,
      );

      state.recentlyViewedFunds = [fund, ...filtered].slice(0, 4);
    },
  },
});

export const {
  setActiveTabIndex,
  setFilters,
  resetFilters,
  setActiveColumn,
  setRecentlyViewedFunds,
} = mutualFundSlice.actions;

export const selectActiveTabIndex = (state) => state.mutualFund.activeTabIndex;
export const selectFilters = (state) => state.mutualFund.filters;
export const selectActiveColumn = (state) => state.mutualFund.activeColumn;
export const selectRecentlyViewedFunds = (state) =>
  state.mutualFund.recentlyViewedFunds;

export default mutualFundSlice.reducer;
