import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}

export default Layout;
