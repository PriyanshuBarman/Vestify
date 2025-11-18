import { useSSEConnection } from "@/hooks/useSSEConnection";
import { lazy } from "react";
import { Outlet } from "react-router";
import BottomNavbar from "./BottomNavbar";
import DailyRewardModal from "./DailyRewardModal";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
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
      <Footer />
    </>
  );
}

export default Layout;
