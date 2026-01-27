import { Outlet } from "react-router";
import { usePrefetchRequiredQueries } from "../hooks/usePrefetchRequiredQueries";
import Tabs from "./Tabs";

function Layout() {
  usePrefetchRequiredQueries();

  return (
    <div className="sm:px-6">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default Layout;
