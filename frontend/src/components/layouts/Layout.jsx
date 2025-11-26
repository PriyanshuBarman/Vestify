import { useSSEConnection } from "@/hooks/useSSEConnection";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";
const DailyRewardModal = lazy(() => import("./DailyRewardModal"));
const BottomNavbar = lazy(() => import("./BottomNavbar"));
const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("../Footer"));

function Layout() {
  useSSEConnection();

  return (
    <>
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
    </>
  );
}

export default Layout;
