import ErrorPage from "@/pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import Footer from "../Footer";
import NavbarPublic from "./NavbarPublic";
import ScrollToTop from "./ScrollToTop";

function PublicLayout() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className="flex items-center justify-center">
        <NavbarPublic />
      </div>
      <Outlet />
      <Footer className="mt-20 border-transparent sm:mt-34" />
      <ScrollToTop />
    </ErrorBoundary>
  );
}

export default PublicLayout;
