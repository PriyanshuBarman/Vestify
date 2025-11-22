import AuthGuard from "@/components/AuthGuard";
import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PinSetupPage = lazy(() => import("./pages/PinSetUpPage"));

export const authRoutes = {
  path: "/auth",
  children: [
    {
      path: "login",
      element: (
        <AuthGuard mode="private">
          <LoginPage />
        </AuthGuard>
      ),
    },
    {
      path: "signup",
      element: (
        <AuthGuard mode="private">
          <SignupPage />
        </AuthGuard>
      ),
    },
    {
      path: "logout",
      element: (
        <AuthGuard>
          <LogoutPage />
        </AuthGuard>
      ),
    },
    {
      path: "pin-setup",
      element: <PinSetupPage />,
    },
  ],
};
