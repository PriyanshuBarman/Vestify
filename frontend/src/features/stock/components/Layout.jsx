import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="sm:px-6">
      <Outlet />
    </div>
  );
}

export default Layout;
