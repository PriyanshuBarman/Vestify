import { VITE_GOOGLE_CLIENT_ID } from "@/config/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { routes } from "./routes";
import { selectTheme } from "./store/slices/themeSlice";
import { shouldInvalidateCache } from "./utils/shouldInvalidateCache";

function App() {
  const theme = useSelector(selectTheme);
  const isRestoring = useIsRestoring();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isRestoring) return;
    if (shouldInvalidateCache()) {
      queryClient.invalidateQueries();
    }
  }, [isRestoring, queryClient]);

  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={routes} />
      <Toaster theme={theme} position="top-right" richColors />
    </GoogleOAuthProvider>
  );
}

export default App;
