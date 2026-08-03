import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { api } from "@/lib/axios";
import { VITE_BACKEND_BASE_URL } from "@/lib/config/env";
import { setOnlineUsers } from "@/store/slices/onlineUsersSlice";
import { setIsMarketOpen, setLiveStocks } from "@/store/slices/stockSlice";
import { store } from "@/store/store";
import { playMarketOpenBellSound } from "@/utils/sound";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const socketInstance = io(VITE_BACKEND_BASE_URL, {
      withCredentials: true,
    });

    // Auto-refresh token on auth error
    socketInstance.on("connect_error", async (err) => {
      if (err?.message?.includes("Authentication error")) {
        try {
          await api.post("/auth/refresh-token");
          socketInstance.connect();
        } catch (refreshErr) {
          console.error(
            "Socket auth error & token refresh failed:",
            refreshErr,
          );
        }
      }
    });

    // Stock price updates
    socketInstance.on("stock:update", (data) => {
      store.dispatch(setLiveStocks({ symbol: data.symbol, data }));
    });

    // Market open/close status
    socketInstance.on("market:status", (isOpen) => {
      store.dispatch(setIsMarketOpen(isOpen));
    });
    socketInstance.on("market:open", () => {
      playMarketOpenBellSound();
    });
    socketInstance.on("market:close", () => {
      playMarketOpenBellSound();
    });

    // User balance updates
    socketInstance.on("balance:update", (data) => {
      if (data?.balance !== undefined) {
        queryClient.setQueryData(["balance"], data.balance);
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      }
    });

    // Stock order execution updates
    socketInstance.on("order:executed", (data) => {
      const userKey = "self";
      if (data?.orderId) {
        queryClient.invalidateQueries({
          queryKey: [userKey, "stocks", "order", data.orderId],
        });
      }
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "open-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "today-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "portfolio"],
      });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    });

    // Online users list updates
    socketInstance.on("user:online", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [queryClient, dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);
