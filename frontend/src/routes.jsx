import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/layouts/Layout";
import LoadingState from "./components/LoadingState";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutual-fund/routes";
import SearchPage from "./features/search/pages/Page";
import { stockRoutes } from "./features/stock/routes";
import { walletRoutes } from "./features/wallet/routes";
import ProfilePage from "./pages/ProfilePage";

const WelcomePage = lazy(() => import("./features/auth/pages/WelcomePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const DeleteAccountPage = lazy(() => import("./pages/DeleteAccountPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ReferAndEarnPage = lazy(() => import("./pages/ReferAndEarnPage"));
const ActiveDevicesPage = lazy(() => import("./pages/ActiveDevicesPage"));
const AllOrdersPage = lazy(
  () => import("./features/mutual-fund/pages/AllOrdersPage"),
);
const VerifyEmailChangeOTPPage = lazy(
  () => import("./pages/VerifyEmailChangeOTPPage"),
);
const ClearCachePage = lazy(() => import("./pages/ClearCachePage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ChangePinPage = lazy(() => import("./pages/ChangePinPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ChangeEmailPage = lazy(() => import("./pages/ChangeEmailPage"));
const AccountDetailsPage = lazy(() => import("./pages/AccountDetailsPage"));
const EditFieldPage = lazy(() => import("./pages/EditFieldPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

export const routes = createBrowserRouter([
  authRoutes,
  {
    path: "/about",
    element: (
      <Suspense fallback={<LoadingState fullPage />}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: "/terms-and-conditions",
    element: (
      <Suspense fallback={<LoadingState fullPage />}>
        <TermsPage />
      </Suspense>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <Suspense fallback={<LoadingState fullPage />}>
        <PrivacyPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <WelcomePage />,
  },
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
        path: "/search",
        element: <SearchPage />,
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
        element: <AllOrdersPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/account-details",
        element: <AccountDetailsPage />,
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
        path: "/refer-and-earn",
        element: <ReferAndEarnPage />,
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        children: [
          {
            index: true,
            element: <SettingsPage />,
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
          {
            path: "delete-account",
            element: (
              <Suspense fallback={<LoadingState fullPage />}>
                <DeleteAccountPage />
              </Suspense>
            ),
          },
          {
            path: "clear-cache",
            element: (
              <Suspense fallback={<LoadingState fullPage />}>
                <ClearCachePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
