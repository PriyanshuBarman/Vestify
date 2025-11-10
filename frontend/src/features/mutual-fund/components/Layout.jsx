import { Outlet } from "react-router";
import Tabs from "./Tabs";

function Layout() {
  return (
    <div className="sm:px-12 sm:pb-24 xl:px-0">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default Layout;
