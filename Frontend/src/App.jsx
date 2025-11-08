import { VITE_GOOGLE_CLIENT_ID } from "@/config/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { routes } from "./routes";
import { selectTheme } from "./store/slices/themeSlice";

function App() {
  const theme = useSelector(selectTheme);
  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={routes} />
      <Toaster theme={theme} position="top-right" richColors />
    </GoogleOAuthProvider>
  );
}

export default App;
