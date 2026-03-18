import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";

import ErrorPage from "@/pages/ErrorPage";

import Footer from "../Footer";
import NavbarPublic from "./NavbarPublic";
import ScrollToTop from "./ScrollToTop";

function PublicLayout() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <NavbarPublic />
      <Outlet />
      <Footer className="mt-20 border-transparent sm:mt-34" />
      <ScrollToTop />
    </ErrorBoundary>
  );
}

export default PublicLayout;
