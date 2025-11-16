import { Outlet } from "react-router";
import Tabs from "./Tabs";

function Layout() {
  return (
    <div className="sm:px-6">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default Layout;
