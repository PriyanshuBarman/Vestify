import { useSSEConnection } from "@/hooks/useSSEConnection";
import { Outlet } from "react-router";
import BottomNavbar from "./BottomNavbar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import DailyRewardModal from "./DailyRewardModal";

function Layout() {
  useSSEConnection();

  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTop />
      <BottomNavbar />
      <DailyRewardModal />
    </>
  );
}

export default Layout;
