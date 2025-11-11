import { Outlet } from "react-router";
import Tabs from "./Tabs";

function Layout() {
  return (
    <div className="sm:px-6 sm:pb-24">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default Layout;
