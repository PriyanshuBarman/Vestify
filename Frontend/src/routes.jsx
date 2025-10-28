import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/layouts/Layout";
import LoadingState from "./components/LoadingState";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutualfund/routes";
import { stockRoutes } from "./features/stock/routes";
import { walletRoutes } from "./features/wallet/routes";
import ProfilePage from "./pages/ProfilePage";

const ActiveDevicesPage = lazy(() => import("./pages/ActiveDevicesPage"));
const MobileSearchPage = lazy(
  () => import("./features/search/pages/MobileSearchPage"),
);
const AllOrdersPage = lazy(
  () => import("./features/mutualfund/pages/AllOrdersPage"),
);
const VerifyEmailChangeOTPPage = lazy(
  () => import("./pages/VerifyEmailChangeOTPPage"),
);
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ChangePinPage = lazy(() => import("./pages/ChangePinPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ChangeEmailPage = lazy(() => import("./pages/ChangeEmailPage"));
const AccountDetailsPage = lazy(() => import("./pages/AccountDetailsPage"));
const EditFieldPage = lazy(() => import("./pages/EditFieldPage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      walletRoutes,
      stockRoutes,
      mutualFundRoutes,
      {
        index: true,
        element: <Navigate to="/mutual-funds#explore" replace />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <MobileSearchPage />
          </Suspense>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <AllOrdersPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/account-details",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <AccountDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/edit-field/:field",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <EditFieldPage />
          </Suspense>
        ),
      },
      {
        path: "/change-email",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <ChangeEmailPage />
          </Suspense>
        ),
      },
      {
        path: "/verify-email-change-otp",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <VerifyEmailChangeOTPPage />
          </Suspense>
        ),
      },
      {
        path: "/coming-soon",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <ComingSoonPage />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingState fullPage />}>
                <SettingsPage />
              </Suspense>
            ),
          },
          {
            path: "change-pin",
            element: (
              <Suspense fallback={<LoadingState fullPage />}>
                <ChangePinPage />
              </Suspense>
            ),
          },
          {
            path: "change-password",
            element: (
              <Suspense fallback={<LoadingState fullPage />}>
                <ChangePasswordPage />
              </Suspense>
            ),
          },
          {
            path: "active-devices",
            element: (
              <Suspense fallback={<LoadingState fullPage />}>
                <ActiveDevicesPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  authRoutes,
]);
