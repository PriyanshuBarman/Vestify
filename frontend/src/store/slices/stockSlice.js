import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTabIndex: 0,

  liveStocks: {},
  isMarketOpen: false,
  recentlyViewedStocks: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setActiveTabIndex: (state, action) => {
      state.activeTabIndex = action.payload;
    },
    setLiveStocks: (state, action) => {
      state.liveStocks[action.payload.symbol] = action.payload.data;
    },
    setIsMarketOpen: (state, action) => {
      state.isMarketOpen = action.payload;
    },
    addToRecentlyViewedStocks: (state, action) => {
      const { symbol, name } = action.payload;
      const recentlyViewedStocks = state.recentlyViewedStocks ?? [];

      state.recentlyViewedStocks = [
        { symbol, name },
        ...recentlyViewedStocks.filter((stock) => stock.symbol !== symbol),
      ].slice(0, 7);
    },
  },
});

export const {
  setActiveTabIndex,
  setLiveStocks,
  setIsMarketOpen,
  addToRecentlyViewedStocks,
} = stockSlice.actions;

export const selectActiveTabIndex = (state) => state.stock.activeTabIndex;
export const selectRecentlyViewedStocks = (state) =>
  state.stock.recentlyViewedStocks;

export default stockSlice.reducer;
