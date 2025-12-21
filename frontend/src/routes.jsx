import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/layouts/Layout";
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
const SuccessPage = lazy(() => import("./pages/SuccessPage"));

export const routes = createBrowserRouter([
  authRoutes,
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPage />,
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
        path: "/success",
        element: <SuccessPage />,
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
        element: <EditFieldPage />,
      },
      {
        path: "/change-email",
        element: <ChangeEmailPage />,
      },
      {
        path: "/verify-email-change-otp",
        element: <VerifyEmailChangeOTPPage />,
      },
      {
        path: "/refer-and-earn",
        element: <ReferAndEarnPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
            element: <ChangePinPage />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
          {
            path: "active-devices",
            element: <ActiveDevicesPage />,
          },
          {
            path: "delete-account",
            element: <DeleteAccountPage />,
          },
          {
            path: "clear-cache",
            element: <ClearCachePage />,
          },
        ],
      },
    ],
  },
]);
