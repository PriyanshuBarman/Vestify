import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { fetchPendingOrders } from "../api/order";
import { fetchPortfolio } from "../api/portfolio";
import { fetchWatchlist } from "../api/watchlist";
import Tabs from "./Tabs";

function Layout() {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    queryClient.prefetchQuery({
      queryKey: ["mfPortfolio"],
      queryFn: fetchPortfolio,
    });
    queryClient.prefetchQuery({
      queryKey: ["pending-orders"],
      queryFn: fetchPendingOrders,
    });
    queryClient.prefetchQuery({
      queryKey: ["watchlist"],
      queryFn: fetchWatchlist,
    });
  }, [isRestoring]);

  return (
    <div className="sm:px-6">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default Layout;
