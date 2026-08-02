import { createSlice } from "@reduxjs/toolkit";

import { BSE_INDICES } from "../../features/stock/constants/bseIndices";

const initialState = {
  activeTabIndex: 0,

  liveStocks: {},
  isMarketOpen: false,
  recentlyViewedStocks: [],
  topByVolumeIndex: BSE_INDICES[1].value,
  topMoversIndex: BSE_INDICES[0].value,
  fiftyTwoWeekHighLowIndex: BSE_INDICES[1].value,
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
      ].slice(0, 8);
    },
    setTopByVolumeIndex: (state, action) => {
      state.topByVolumeIndex = action.payload;
    },
    setTopMoversIndex: (state, action) => {
      state.topMoversIndex = action.payload;
    },
    setFiftyTwoWeekHighLowIndex: (state, action) => {
      state.fiftyTwoWeekHighLowIndex = action.payload;
    },
  },
});

export const {
  setActiveTabIndex,
  setLiveStocks,
  setIsMarketOpen,
  addToRecentlyViewedStocks,
  setTopByVolumeIndex,
  setTopMoversIndex,
  setFiftyTwoWeekHighLowIndex,
} = stockSlice.actions;

export const selectActiveTabIndex = (state) => state.stock.activeTabIndex;
export const selectRecentlyViewedStocks = (state) =>
  state.stock.recentlyViewedStocks;
export const selectTopByVolumeIndex = (state) =>
  state.stock.topByVolumeIndex || BSE_INDICES[1].value;
export const selectTopMoversIndex = (state) =>
  state.stock.topMoversIndex || BSE_INDICES[0].value;
export const selectFiftyTwoWeekHighLowIndex = (state) =>
  state.stock.fiftyTwoWeekHighLowIndex || BSE_INDICES[1].value;

export default stockSlice.reducer;
