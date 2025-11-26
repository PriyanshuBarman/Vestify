import { VITE_GOOGLE_CLIENT_ID } from "@/config/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { routes } from "./routes";
import { selectTheme } from "./store/slices/themeSlice";
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  const theme = useSelector(selectTheme);
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={routes} />
        <Toaster theme={theme} position="top-right" richColors />
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
