import { useSSEConnection } from "@/hooks/useSSEConnection";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const DailyRewardModal = lazy(() => import("./DailyRewardModal"));
const BottomNavbar = lazy(() => import("./BottomNavbar"));
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("../Footer"));

function Layout() {
  useSSEConnection();

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <Outlet />
        <ScrollToTop />
        <BottomNavbar />
        <DailyRewardModal />
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Layout;
