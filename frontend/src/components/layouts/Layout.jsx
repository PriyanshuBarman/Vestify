import { lazy, Suspense, useEffect } from "react";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";

import { fetchBalance } from "@/api/wallet";
import { SocketProvider } from "@/context/SocketContext";
import ErrorPage from "@/pages/ErrorPage";

import ScrollToTop from "./ScrollToTop";

const AnnouncementBanner = lazy(() => import("../AnnouncementBanner"));
const DailyRewardModal = lazy(() => import("./DailyRewardModal"));
const BottomNavbar = lazy(() => import("./BottomNavbar"));
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("../Footer"));

function Layout() {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    queryClient.prefetchQuery({
      queryKey: ["balance"],
      queryFn: fetchBalance,
    });
  }, [isRestoring, queryClient]);

  return (
    <SocketProvider>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorPage error={error} />}
      >
        <AnnouncementBanner />
        <Navbar />
        <div className="mx-auto max-w-[1300px]">
          <Outlet />
        </div>
        <ScrollToTop />
        <BottomNavbar />
        <DailyRewardModal />
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </SocketProvider>
  );
}

export default Layout;
