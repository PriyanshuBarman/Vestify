import { io } from "socket.io-client";

import { setIsMarketOpen, setLiveStocks } from "@/store/slices/stockSlice";
import { store } from "@/store/store";

export const socket = io("http://localhost:3000");

socket.on("stock-update", (data) => {
  store.dispatch(setLiveStocks({ symbol: data.symbol, data }));
});

socket.on("market-status-update", (isOpen) => {
  store.dispatch(setIsMarketOpen(isOpen));
});
