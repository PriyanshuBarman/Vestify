import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import AuthGuard from "./components/AuthGuard";
import Layout from "./components/layouts/Layout";
import PublicLayout from "./components/layouts/PublicLayout";
import { authRoutes } from "./features/auth/routes";
import { communityRoutes } from "./features/community/routes";
import { mutualFundRoutes } from "./features/mutual-fund/routes";
import SearchPage from "./features/search/pages/Page";
import { stockRoutes } from "./features/stock/routes";
import { walletRoutes } from "./features/wallet/routes";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";

const Page = lazy(() => import("./pages/Page"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const DeleteAccountPage = lazy(() => import("./pages/DeleteAccountPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ReferAndEarnPage = lazy(() => import("./pages/ReferAndEarnPage"));
const ActiveDevicesPage = lazy(() => import("./pages/ActiveDevicesPage"));
const AllOrdersPage = lazy(() => import("./pages/AllOrdersPage"));
const VerifyEmailChangeOTPPage = lazy(
  () => import("./pages/VerifyEmailChangeOTPPage"),
);
const ClearCachePage = lazy(() => import("./pages/ClearCachePage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ChangePinPage = lazy(() => import("./pages/ChangePinPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ChangeEmailPage = lazy(() => import("./pages/ChangeEmailPage"));
const AccountDetailsPage = lazy(() => import("./pages/AccountDetailsPage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const SearchUserPage = lazy(() => import("./pages/SearchUserPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));

export const routes = createBrowserRouter([
  authRoutes,
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Page />,
      },
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
        path: "/contact-us",
        element: <ContactUsPage />,
      },
    ],
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
      mutualFundRoutes,
      communityRoutes,
      stockRoutes,
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/search-user",
        element: <SearchUserPage />,
      },
      {
        path: "/orders",
        element: <AllOrdersPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
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
        path: "/edit-profile/:field",
        element: <EditProfilePage />,
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
        path: "/error",
        element: <ErrorPage />,
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
