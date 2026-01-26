import { fetchBalance } from "@/api/wallet";
import { useSSEConnection } from "@/hooks/useSSEConnection";
import ErrorPage from "@/pages/ErrorPage";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";
const DailyRewardModal = lazy(() => import("./DailyRewardModal"));
const BottomNavbar = lazy(() => import("./BottomNavbar"));
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("../Footer"));

function Layout() {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();
  useSSEConnection();

  useEffect(() => {
    if (isRestoring) return;

    queryClient.prefetchQuery({
      queryKey: ["balance"],
      queryFn: fetchBalance,
    });
  }, [isRestoring]);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className="mx-auto max-w-[1300px]">
        <Navbar />
        <Outlet />
      </div>
      <ScrollToTop />
      <BottomNavbar />
      <DailyRewardModal />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Layout;
