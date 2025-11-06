import { useSSEConnection } from "@/hooks/useSSEConnection";
import { Outlet } from "react-router";
import BottomNavbar from "./BottomNavbar";
import DailyRewardModal from "./DailyRewardModal";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

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
