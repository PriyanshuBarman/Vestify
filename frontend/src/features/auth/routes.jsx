import AuthGuard from "@/components/AuthGuard";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PinSetupPage = lazy(() => import("./pages/PinSetUpPage"));
const AvatarSetUpPage = lazy(() => import("./pages/AvatarSetUpPage"));

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
    {
      path: "avatar-setup",
      element: (
        <Suspense>
          <AuthGuard>
            <AvatarSetUpPage />
          </AuthGuard>
        </Suspense>
      ),
    },
  ],
};
